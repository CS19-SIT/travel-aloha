const [withdrawButton, submitButton] = [document.getElementById('withdraw'), document.getElementById('submit')]

if (withdrawButton) {
	withdrawButton.addEventListener('click', function() {
		$.ajax({
			url: '/admin/staff/sendQuery',
			method: 'POST',
			data: {
				sql: `DELETE FROM staff_admin_info WHERE staffID='${userId}' AND status='pending'`
			}
		}).done(function(data) {
			if (data.status == 200)  {
				Swal.fire({
					title: 'Success', 
					text: 'you just canceled the application',
					icon: 'success',
					showConfirmButton: false
				})
			} else {
				Swal.fire({
					title: 'Oops', 
					text: 'something went wrong',
					icon: 'error',
					showConfirmButton: false
				})
			}
			setTimeout(function() {
				location.reload(true)
			}, 1200)
		})
	})
}

if (submitButton) {
	const formValidation = function() {
		if (/^[A-Za-z]{1,}$/.test(document.getElementById('department').value) == false) return false
		if (/^[A-Za-z]{1,}$/.test(document.getElementById('role').value) == false) return false
		return true
	}
	submitButton.addEventListener('click', function() {
		if (formValidation() == false) {
			Swal.fire('Wrong format', 'please re-check the form', 'error')
		} else {
			Swal.fire({
				title: 'Are you sure',
				text: 'please check what you have typed carefully',
				icon: 'info',
				showCancelButton: true
			}).then(function(result) {
				if (result.value) {
					$.ajax({
						url: '/admin/staff/sendQuery',
						method: 'POST',
						data: {
							sql: `INSERT INTO staff_admin_info VALUES ('${userId}', '${document.getElementById('department').value}', '${document.getElementById('role').value}', 'pending') ON DUPLICATE KEY UPDATE department=VALUES(department), role=VALUES(role), status='pending'`
						}
					}).done(function(data) {
						if (data.status == 200)  {
							Swal.fire({
								title: 'Success', 
								text: 'your application have been sent',
								icon: 'success',
								showConfirmButton: false
							})
						} else {
							Swal.fire({
								title: 'Oops', 
								text: 'something went wrong',
								icon: 'error',
								showConfirmButton: false
							})
						}
						setTimeout(function() {
							location.reload(true)
						}, 1200)
					})
				}
			})
		}
	})
}
