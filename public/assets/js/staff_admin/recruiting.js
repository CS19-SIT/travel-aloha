const AJAXsend = function(script, callback) {
	$.ajax({
		url: '/admin/staff/sendQuery', method: 'POST',
		data: {
			sql: script
		}
	}).done(callback)
}

const [withdrawButton, submitButton] = [document.getElementById('withdraw'), document.getElementById('submit')]

if (withdrawButton) {
	withdrawButton.addEventListener('click', function() {
		AJAXsend(
			`DELETE FROM staff_admin_pre WHERE staffId='${userId}' AND status='pending'`, 
			function(data) {
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
				setTimeout(() => location.reload(true), 1200)
			}
		)
	})
}

if (submitButton) {
	const formValidation = function() {
		if (/^[A-Za-z ]{1,}$/.test(department.value.trim()) == false) return false
		if (/^[A-Za-z ]{1,}$/.test(role.value.trim()) == false) return false
		return true
	}
	submitButton.addEventListener('click', function() {
		if (formValidation() == false) {
			Swal.fire('Wrong format', 'please re-check the form', 'error')
		} else {
			Swal.fire({
				title: 'Are you sure',
				text: 'have you checked what you typed carefully',
				icon: 'info',
				confirmButtonText: 'Yes, I have checked',
				showCancelButton: true
			}).then(function(result) {
				if (result.value) {
					AJAXsend(
						`INSERT INTO staff_admin_pre VALUES ('${userId}', '${department.value.trim().replace(/ {1,}/g, ' ')}', '${role.value.trim().replace(/ {1,}/g, ' ')}', 'pending', '${message.value.trim().replace(/ {1,}/g, ' ')}')`,
						function(data) {
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
							setTimeout(() => location.reload(true), 1200)
						}
					)
				}
			})
		}
	})
}
