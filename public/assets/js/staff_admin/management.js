let updatedList = new Set()
let deletedList = new Set()
const editableProperties = new Set(['department', 'role'])

const getStaffFromId = function(id) {
	return staffs.find(function(item) {
		return item['user_id'] == id
	})
}

const refreshPage = function() {
	setTimeout(function() {
		location.reload(true)
	}, 1300)
}

if (canUpdate == 'true') {
	Array.prototype.forEach.call(document.getElementsByClassName('editButton'), function(item) {
		item.addEventListener('click', function() {
			let thisStaffCard = this.parentNode.parentNode
			let inputForm = Array.from(editableProperties, function(item) {
				return `<div class="form-group">
				<label for="${item}">${item}</label>
				<input type="text" class="form-control" id="${item}" placeholder="${thisStaffCard.getElementsByClassName(item)[0].textContent}">
			</div>`
			}).join('')
			Swal.fire({
				title: 'Edit some information',
				html: inputForm,
				focusConfirm: false,
				showCancelButton: true,
				preConfirm: function() {
					editableProperties.forEach(function(item) {
						let previousInfo = thisStaffCard.getElementsByClassName(item)[0]
						const thisStaffId = thisStaffCard.getElementsByClassName('user_id')[0].textContent
						if (document.getElementById(item).value && document.getElementById(item).value != previousInfo.textContent) {
							previousInfo.textContent = document.getElementById(item).value
							previousInfo.parentNode.classList.add('isChanged')
							updatedList.add(thisStaffId)
						}
						if (document.getElementById(item).value == getStaffFromId(thisStaffId)[item]) {
							previousInfo.parentNode.classList.remove('isChanged')
							updatedList.delete(thisStaffId)
						}
					})
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
			$.ajax({ // Call to update info
				url: '/admin/staff/sendQuery',
				method: 'POST',
				data: {
					sql: `INSERT INTO staff_admin_info(staffId, department, role) VALUES ${updateValues.join(',')} ON DUPLICATE KEY UPDATE department=VALUES(department), role=VALUES(role)`
				}  
			}).done(function(data) {
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
			})
		} else {
			callback(refreshPage)
		}
	}
	const deleteFn = function(callback) {
		if (deletedList.size != 0) {
			const deletedId = Array.from(deletedList, function(id) {
				return `'${id}'`
			}).join(',')

			$.ajax({ // Call to delete staff
				url: '/admin/staff/sendQuery',
				method: 'POST',
				data: {
					sql: `UPDATE staff_admin_info SET status='inactive' WHERE staffId IN (${deletedId})`
				}
			}).done(function(data) {
				if (data.status == 200) {
					Swal.fire({
						title: 'No problem',
						text: 'all information has been updated',
						icon: 'success',
						showConfirmButton: false,
					})
					callback()
				} else {
					Swal.fire({
						title: 'Something went wrong',
						text: 'cannot delete some information',
						icon: 'error',
						showConfirmButton: false,
					})
					callback()
				}
			})
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

			$.ajax({ // Check if some of staff was just changed to be inactive
				url: '/admin/staff/getQuery',
				method: 'POST',
				data: {
					sql: `SELECT status FROM staff_admin_info WHERE staffId IN (${updatedId}) AND status='active'`
				}
			}).done(function(data) {
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
			})
		}
	})
}
