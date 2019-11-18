const AJAXget = function(script, callback) {
	$.ajax({
		url: '/admin/staff/getQuery', method: 'POST', 
		data: {
			sql: script
		}
	}).done(callback)
}
const AJAXsend = function(script, callback) {
	$.ajax({
		url: '/admin/staff/sendQuery', method: 'POST',
		data: {
			sql: script
		}
	}).done(callback)
}

let updatedList = new Set()
let deletedList = new Set()
const editableProperties = new Set(['department', 'role'])

const getStaffFromId = function(id) {
	return staffs.find((item) => item['user_id'] == id)
}

const refreshPage = function() {
	setTimeout(() => location.reload(true), 1200)
}

if (canUpdate == 'true') {
	Array.prototype.forEach.call(document.getElementsByClassName('editButton'), function(item) {
		item.addEventListener('click', function() {
			let thisStaffCard = this.parentNode.parentNode
			const thisStaffId = thisStaffCard.getElementsByClassName('user_id')[0].textContent
			Swal.fire({
				title: 'Edit some information',
				html: `
					<div class="form-group">
						<label for="department">department</label>
						<input type="text" class="form-control" id="department" value="${thisStaffCard.getElementsByClassName('department')[0].textContent}">
					</div>
					<div class="form-group">
						<label for="role">role</label>
						<input type="text" class="form-control" id="role" value="${thisStaffCard.getElementsByClassName('role')[0].textContent}">
					</div>
				`,
				focusConfirm: false,
				showCancelButton: true,
				preConfirm: function() {
					try {
						const [newDepartment, newRole] = [department.value.trim().replace(/ {1,}/g, ' '), role.value.trim().replace(/ {1,}/g, ' ')]
						if (/^[A-Za-z ]{1,}$/.test(newDepartment) == false) throw 'department [Can only use alphabets]'
						if (/^[A-Za-z ]{1,}$/.test(newRole) == false) throw 'role [Can only use alphabets]'
						thisStaffCard.getElementsByClassName('department')[0].textContent = newDepartment
						thisStaffCard.getElementsByClassName('department')[0].parentNode.classList.remove('isChanged')
						thisStaffCard.getElementsByClassName('role')[0].textContent = newRole
						thisStaffCard.getElementsByClassName('role')[0].parentNode.classList.remove('isChanged')
						const originalInfo = getStaffFromId(thisStaffId)
						updatedList.delete(thisStaffId)
						let count = 0
						if (newDepartment != originalInfo['department']) {
							thisStaffCard.getElementsByClassName('department')[0].parentNode.classList.add('isChanged')
							++count
						}
						if (newRole != originalInfo['role']) {
							thisStaffCard.getElementsByClassName('role')[0].parentNode.classList.add('isChanged')
							++count
						}
						if (count) updatedList.add(thisStaffId)
					} catch (error) {
						Swal.showValidationMessage(`Wrong format: ${error}`)
					}
				}
			})
		})
	})
}

if (canDelete == 'true') {
	Array.prototype.forEach.call(document.getElementsByClassName('deleteButton'), function(item) {
		item.addEventListener('click', function() {
			let thisButton = this
			Swal.fire({
				title: 'Do you really want to delete?',
				icon: 'warning',
				showCancelButton: true
			}).then(function(result) {
				if (result.value) {
					let thisStaff = thisButton.parentNode.parentNode
					deletedList.add(thisStaff.getElementsByClassName('user_id')[0].textContent)
					thisStaff.parentNode.removeChild(thisStaff)
				}
			})
		})
	})
}

if (canUpdate == 'true' || canDelete == 'true') {
	const updateFn = function(callback) {
		if (updatedList.size != 0) {
			let updateValues = []
			Array.prototype.forEach.call(document.getElementsByTagName('staffCard'), function(item) {
				if (updatedList.has(item.getElementsByClassName('user_id')[0].textContent)) {
					updateValues.push(`('${item.getElementsByClassName('user_id')[0].textContent}','${item.getElementsByClassName('department')[0].textContent}','${item.getElementsByClassName('role')[0].textContent}')`)
				}
			})
			AJAXsend(
				`INSERT INTO staff_admin_info(staffId, department, role) VALUES ${updateValues.join(',')} ON DUPLICATE KEY UPDATE department=VALUES(department), role=VALUES(role)`,
				function(data) {
					if (data.status == 200) {
						callback(refreshPage)
					} else {
						Swal.fire({
							title: 'Something was wrong',
							text: 'can\'t update new information',
							icon: 'error',
							showConfirmButton: false
						})
						refreshPage()
					}
				}
			)
		} else {
			callback(refreshPage)
		}
	}
	const deleteFn = function(callback) {
		if (deletedList.size != 0) {
			const deletedId = Array.from(deletedList, function(id) {
				return `'${id}'`
			}).join(',')

			try {
				AJAXsend(
					`DELETE FROM staff_admin_CRUD WHERE staffId IN (${deletedId})`,
					function(data) {
						if (data.status == 200) {
							AJAXsend(
								`DELETE FROM staff_admin_info WHERE staffId IN (${deletedId})`,
								function(data) {
									if (data.status == 200) {
										Swal.fire({
											title: 'No problem',
											text: 'all information has been updated',
											icon: 'success',
											showConfirmButton: false,
										})
										callback()
									} else {
										throw 'wrong one'
									}
								}
							)
						} else {
							throw 'wrong one'
						}		
					}
				)
			} catch {
				Swal.fire({
					title: 'Something went wrong',
					text: 'cannot delete some information',
					icon: 'error',
					showConfirmButton: false,
				})
				callback()
			}
		} else {
			Swal.fire({
				title: 'No problem',
				text: 'all information has been updated',
				icon: 'success',
				showConfirmButton: false,
			})
			callback()
		}
	}

	document.getElementById('save').addEventListener('click', function() {
		if (updatedList.size == 0 && deletedList.size == 0) {
			Swal.fire({
				icon: 'info',
				title: 'Nothing',
				text: 'You did\'t change anything',
				showConfirmButton: false,
				timer: 900
			})
		} else if (updatedList.size == 0) {
			deleteFn(refreshPage)
		} else {
			const updatedId = Array.from(updatedList, function(id) {
				return `'${id}'`
			}).join(',')
			AJAXget(
				`SELECT status FROM staff_admin_info WHERE staffId IN (${updatedId}) AND status='active'`,
				function(data) {
					if (data.status == 200 && data.result.length == updatedList.size) {
						updateFn(deleteFn)
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Something was wrong',
							showConfirmButton: false
						})
						refreshPage()
					}
				}
			)
		}
	})
}
