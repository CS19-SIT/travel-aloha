candidatesInfo = data
let candidatesId = candidatesInfo['user_id']
delete candidatesInfo['user_id']

if (onPending == 'true') {
	document.getElementById('withdraw').addEventListener('click', function() {
		$.ajax({
			url: '/staff_admin/sendQuery',
			method: 'POST',
			data: {
				sql: `DELETE FROM staff_admin_info WHERE staffID='${candidatesId}' AND status='pending'`
			}
		}).done(function(data, textStatus, jqXHR) {
			if (data.status == 200) {
				Swal.fire({
					icon: 'info',
					title: 'You just canceled the application',
					showConfirmButton: false,
					timer: 1200
				})
				setTimeout(function() {
					location.reload(true)
				}, 1200)
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Something was wrong',
					showConfirmButton: false,
					timer: 1200
				})
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			Swal.fire({
				icon: 'error',
				title: 'Problems occured',
				showConfirmButton: false,
				timer: 1200
			})
		})
	})
} else {
	candidatesInfo['birth_date'] = new Date(candidatesInfo['birth_date']).toDateString().substring(4)
	delete candidatesInfo['birth_date']
	document.getElementsByTagName('profileImage')[0].style.backgroundImage = `url('${candidatesInfo['profile_picture']}')`
	delete candidatesInfo['profile_picture']

	let exInfos = document.getElementsByTagName('briefInfo')[0]
	let exInfo = exInfos.getElementsByTagName('p')[0]
	exInfos.removeChild(exInfo)
	for (const [key, value] of Object.entries(candidatesInfo)) {
		exInfo.getElementsByTagName('yTitle')[0].textContent = key
		exInfo.getElementsByTagName('yDetail')[0].textContent = value
		exInfos.appendChild(exInfo.cloneNode(true))
	}

	document.getElementById('submit').addEventListener('click', function() {
		let [department, role] = [document.getElementById('department').value, document.getElementById('role').value]
		if (department && role) {
			$.ajax({
				url: '/staff_admin/sendQuery',
				method: 'POST',
				data: {
					sql: `INSERT INTO staff_admin_info VALUES('${candidatesId}', '${department}', '${role}', 'pending')`
				}
			}).done(function(data, textStatus, jqXHR) {
				if (data.status == 200) {
					Swal.fire({
						icon: 'success',
						title: 'Your information was sent',
						showConfirmButton: false,
						timer: 1200
					})
					setTimeout(function() {
						location.reload(true)
					}, 1200)
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Can\'t insert your info, please try again',
						showConfirmButton: false,
						timer: 1200
					})
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				Swal.fire({
					icon: 'error',
					title: 'Can\'t insert your info, please try again',
					showConfirmButton: false,
					timer: 1200
				})
			})
		} else {
			Swal.fire({
				icon: 'question',
				title: 'Please provide all information',
				showConfirmButton: false,
				timer: 1200
			})
		}
	})
}