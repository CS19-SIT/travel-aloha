staffRecord = [
	{
		'user_id': '001', 
		'name': 'Nino Nakano', 'birth_date': '2000-05-05', 'department': 'culinary', 'role': 'best girl',
		'profile_picture': 'https://bit.ly/2NJfJ5n'
	},{
		'user_id': '002',
		'name': 'Kurumi Tokisaki', 'birth_date': '2000-01-01', 'department': 'veterinary', 'role': 'best girl',
		'profile_picture': 'https://i.ytimg.com/vi/HPynobNcZAU/hqdefault.jpg'
	},{
		'user_id': '003',
		'name': 'Shido Itsuka', 'birth_date': '2000-08-03', 'department': 'housewife', 'role': 'best boy',
		'profile_picture': 'https://pbs.twimg.com/profile_images/820479236179783680/5EUm7iXl.jpg'
	},{
		'user_id': '004',
		'name': 'Jeanne d\'Arc', 'birth_date': '1412-01-06', 'department': 'saint', 'role': 'best girl',
		'profile_picture': 'https://bit.ly/2JW2wVX'
	},{
		'user_id': '005',
		'name': 'Momo Deviluke', 'birth_date': '2000-08-08', 'department': 'foreigner', 'role': 'best girl',
		'profile_picture': 'https://bit.ly/2KsrtbT'
	},{
		'user_id': '006',
		'name': 'Origami Tobiichi', 'birth_date': '2000-04-10', 'department': 'seirei', 'role': 'best girl',
		'profile_picture': 'https://66.media.tumblr.com/e69bd60591bf3765125db7fbc132316b/tumblr_ot5ic7qKwf1vy2tgqo7_250.jpg'
	},{
		'user_id': '007',
		'name': 'Ririna Sanada', 'birth_date': '2001-03-31', 'department': 'student', 'role': 'best girl',
		'profile_picture': 'https://pbs.twimg.com/media/D18bKiaXQAMzT4q.jpg'
	},{
		'user_id': '008',
		'name': 'Mikoto Misaka', 'birth_date': '2000-05-02', 'department': 'student', 'role': 'best girl',
		'profile_picture': 'http://www.ah.xinhuanet.com/2015-04/09/1114914317_14285490003871n.jpg'
	},{
		'user_id': '009',
		'name': 'Yui Yuigahama', 'birth_date': '2000-06-18', 'department': 'student', 'role': 'best girl',
		'profile_picture': 'https://bit.ly/32RUPqn'
	},{
		'user_id': '010',
		'name': 'Jibril Archangel', 'birth_date': '0000-01-01', 'department': 'bibliophile', 'role': 'best girl',
		'profile_picture': 'https://bit.ly/2qlxCiS'
	},{
		'user_id': '011',
		'name': 'Gabriel Tenma', 'birth_date': '2000-04-20', 'department': 'angel', 'role': 'best girl',
		'profile_picture': 'https://i.pinimg.com/originals/0a/9a/f3/0a9af314fa4408fe2ad56f6ac78b3df4.png'
	},{
		'user_id': '012',
		'name': 'Shirakiin Ririchiyo', 'birth_date': '2000-02-21', 'department': 'seirei', 'role': 'best girl',
		'profile_picture': 'https://pm1.narvii.com/6529/9b7be48bc218879c62d6246843b2bcfdeb68e696_hq.jpg'
	},{
		'user_id': '013',
		'name': 'Emi Yusa', 'birth_date': '2000-10-26', 'department': 'yuusha', 'role': 'best girl',
		'profile_picture': 'https://pbs.twimg.com/media/CkbOs4TVAAEIF-N.jpg:small'
	},{
		'user_id': '014',
		'name': 'Juliet Persia', 'birth_date': '2000-07-01', 'department': 'student council', 'role': 'best girl',
		'profile_picture': 'http://tse1.mm.bing.net/th?id=OIP.U9HlYlsLZAPIAo-0xOCoTgAAAA&pid=15.1'
	},{
		'user_id': '015',
		'name': 'Mizuki Usami', 'birth_date': '2000-07-24', 'department': 'art', 'role': 'best girl',
		'profile_picture': 'https://thumbs.gfycat.com/GraveNextAsiansmallclawedotter-poster.jpg'
	},{
		'user_id': '016',
		'name': 'Felix Arvid Ulf Kjellberg', 'birth_date': '1989-10-24', 'department': 'youtuber', 'role': 'a man of culture',
		'profile_picture': 'http://pm1.narvii.com/6142/b4a0169bfcd00579c80c49417f4ece2a5ee8f07b_00.jpg'
	},{
		'user_id': '017',
		'name': 'Isokaze', 'birth_date': '1989-10-24', 'department': 'youtuber', 'role': 'a man of culture',
		'profile_picture': 'https://pm1.narvii.com/6716/940b28b9f1fb582ced38766ef2414f1eb8121f38_hq.jpg'
	},{
		'user_id': '018',
		'name': 'Misaki Tobisawa', 'birth_date': '1939-06-19', 'department': 'docker', 'role': 'destroyer',
		'profile_picture': 'https://static.zerochan.net/Tobisawa.Misaki.full.1999117.jpg'
	},{
		'user_id': '019',
		'name': 'Sakura Miyawaki', 'birth_date': '1998-03-19', 'department': 'youtuber', 'role': 'idol, gamer',
		'profile_picture': 'https://66.media.tumblr.com/fcda27db6797572f886e48c90cac91f6/tumblr_pegczw3Qn61vgdokn_540.jpg'
	}
]

if (canRead == 'true') {
	const getItemFromUserId = function(items, id) {
		return items.find(function(item) {
			return item['user_id'] == id
		})
	}
	const refreshPage = function(delay) {
		setTimeout(function() {
			location.reload(true)
		}, delay)
	}
	let updateList = new Set()
	let deleteList = new Set()
	const editableList = new Set(['department', 'role'])
	let staffList = document.getElementsByTagName('staffList')[0]
	let staffCard = staffList.getElementsByTagName('staffCard')[0]
	let infos = staffCard.getElementsByTagName('information')[0]
	let info = infos.getElementsByTagName('p')[0]
	infos.removeChild(info)
	staffList.removeChild(staffCard)
	let generateStaffCard = function(staffs, isMockup) {
		staffs.forEach(function(staff) {
			let newStaffCard = staffCard.cloneNode(true)
			let newInfo = info.cloneNode(true)
			if (staff['profile_picture']) {
				newStaffCard.getElementsByTagName('profilePicture')[0].style.backgroundImage = `url('${staff['profile_picture']}')`
			}
			delete staff['profile_picture']
			newStaffCard.getElementsByClassName('user_id')[0].textContent = staff['user_id']
			staff['birth_date'] = new Date(staff['birth_date']).toDateString().substring(4)
			for (const [key, value] of Object.entries(staff)) {
				if (key == 'user_id') continue
				newInfo.getElementsByTagName('yTitle')[0].textContent = key
				newInfo.getElementsByTagName('yDetail')[0].textContent = value
				if (editableList.has(key)) {
					newInfo.getElementsByTagName('yDetail')[0].className = '' + key
				}
				newStaffCard.getElementsByTagName('information')[0].appendChild(newInfo.cloneNode(true))
			}
			staffList.appendChild(newStaffCard)
		})
		if (canUpdate == 'true') {
			Array.prototype.forEach.call(document.getElementsByClassName('editButton'), function(item, index) {
				item.addEventListener('click', function() {
					let thisStaffCard = this.parentNode.parentNode
					let strInput = Array.from(editableList, function(s) {
						return `<div class="form-group">
						<label for="${s}">${s}</label>
						<input type="text" class="form-control" id="${s}" placeholder="${thisStaffCard.getElementsByClassName(s)[0].textContent}">
					</div>`
					}).join('')
					Swal.fire({
						title: 'Edit some information',
						html: strInput,
						focusConfirm: false,
						showCancelButton: true,
						preConfirm: function() {
							[...editableList].forEach(function(item) {
								let previousInfo = thisStaffCard.getElementsByClassName(item)[0]
								const thisStaffId = thisStaffCard.getElementsByClassName('user_id')[0].textContent
								if (document.getElementById(item).value && document.getElementById(item).value != previousInfo.textContent) {
									previousInfo.textContent = document.getElementById(item).value
									previousInfo.parentNode.classList.add('isChanged')
									updateList.add(thisStaffId)
								}
								if (document.getElementById(item).value == getItemFromUserId(staffs, thisStaffId)[item]) {
									previousInfo.parentNode.classList.remove('isChanged')
									updateList.delete(thisStaffId)
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
					let selec = this
					Swal.fire({
						icon: 'warning',
						title: 'Do you really want to delete?',
						showCancelButton: true
					}).then(function(result) {
						if (result.value) {
							let thisStaff = selec.parentNode.parentNode
							deleteList.add(thisStaff.getElementsByClassName('user_id')[0].textContent)
							staffList.removeChild(thisStaff)
						}
					})
				})
			})
		}
		if (!isMockup && (canUpdate == 'true' || canDelete == 'true')) {
			document.getElementById('save').addEventListener('click', function() {
				Swal.fire({
					icon: 'warning',
					title: 'Are you sure?',
					html: 'The current information<br/>will be updated in the server',
					showCancelButton: true
				}).then(function(result) {
					if (result.value) {
						if (updateList.size == 0 && deleteList.size == 0) {
							Swal.fire({
								icon: 'info',
								title: 'Nothing',
								text: 'You did\'t change anything',
								showConfirmButton: false,
								timer: 1500
							})
						} else {
							checkConflict(updateFn)
						}
					}
				})
			})
		}
	}

	const checkConflict = function(callback) {
		if (updateList.size == 0) {
			callback(deleteFn)
			return
		}
		try {
			const updatedStaffs = Array.from(updateList, function(s) {
				return `'${s}'`
			}).join(',')
			$.ajax({ // Check if some of staff was just changed to be inactive
				url: '/admin/staff/getQuery',
				method: 'POST',
				data: {
					sql: `SELECT status FROM staff_admin_info WHERE staffId IN (${updatedStaffs})`
				}
			}).done(function(data, textStatus, jqXHR) {
				if (data.status == 200 && data.result.length == updateList.size) {
					let denied = 'false'
					for (let i = 0; i < data.result.length; ++i) {
						if (data.result[i]['status'] == 'inactive') {
							denied = 'true'
							break
						}
					}
					if (denied == 'false') {
						callback(deleteFn)
					} else {
						throw `Some staff have been deleted`	
					}
				} else {
					throw `Some staff doesn't exist`
				}
			})
		} catch (err) {
			Swal.fire({
				icon: 'error',
				title: 'Something was wrong',
				text: `${err}`,
				showConfirmButton: false,
				timer: 1500
			})
			refreshPage(1500)
		}
	}
	const updateFn = function(callback) {
		if (updateList.size == 0) {
			callback(function() {
				refreshPage(1000)
			})
			return
		}
		let updateValues = []
		Array.prototype.forEach.call(document.getElementsByTagName('staffCard'), function(item) {
			if (updateList.has(item.getElementsByClassName('user_id')[0].textContent)) {
				updateValues.push(`('${item.getElementsByClassName('user_id')[0].textContent}','${item.getElementsByClassName('department')[0].textContent}','${item.getElementsByClassName('role')[0].textContent}')`)
			}
		})
		$.ajax({ // Call to update info
			url: '/admin/staff/sendQuery',
			method: 'POST',
			data: {
				sql: `INSERT INTO staff_admin_info(staffId, department, role) VALUES ${updateValues.join(',')} ON DUPLICATE KEY UPDATE department=VALUES(department), role=VALUES(role)`
			}  
		}).done(function(data, textStatus, jqXHR) {
			if (data.status == 200) {
				callback(function() {
					refreshPage(1200)
				})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Something was wrong',
					text: 'can\'t update new information',
					showConfirmButton: false,
					timer: 1200
				})
				refreshPage(1000)
			}
		})
	}
	const deleteFn = function(callback) {
		if (deleteList.size == 0) {
			Swal.fire({
				icon: 'success',
				title: 'No problem',
				text: 'all information has been updated',
				showConfirmButton: false,
				timer: 1200
			})
			callback()
			return
		}
		const deletedStaffs = Array.from(deleteList, function(s) {
			return `'${s}'`
		}).join(',')
		$.ajax({ // Call to delete staff
			url: '/admin/staff/sendQuery',
			method: 'POST',
			data: {
				sql: `UPDATE staff_admin_info SET status='inactive' WHERE staffId IN (${deletedStaffs})`
			}
		}).done(function(data, textStatus, jqXHR) {
			if (data.status == 200) {
				Swal.fire({
					icon: 'success',
					title: 'No problem',
					text: 'all information has been updated',
					showConfirmButton: false,
					timer: 1200
				})
				callback()
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Something was wrong',
					text: 'can\'t update new information',
					showConfirmButton: false,
					timer: 1200
				})
				refreshPage(1000)
			}
		})
	}

	Swal.fire({
		icon: 'info',
		title: 'Mockup?',
		html: `<p>We recommend to use mockup first</p><span>\'Info\' in the database doesn't has enough</span>`,
		showCancelButton: true,
		cancelButtonColor: '#d33',
		confirmButtonColor: '#3085d6',
		confirmButtonText: 'Yes, use mockup',
		cancelButtonText: 'No, don\'t use mockup'
	}).then(function(result) {
		if (result.value) {
			generateStaffCard(staffRecord, true)
		} else {
			generateStaffCard(data, false)
		}
	})
}
