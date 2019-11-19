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

Array.prototype.forEach.call(document.getElementsByClassName('reject'), function(item) {
    item.addEventListener('click', function() {
        let thisManCard = this.parentNode.parentNode
        let thisManId = thisManCard.getElementsByClassName('userid')[0].textContent
        let rejectedMessage = ''
        Swal.fire({
            html: `
                <img class="my-3" style="width: 80%; height: 200px;" src="https://i.kym-cdn.com/entries/icons/original/000/028/223/hmlspst6qjo11.jpg">
                <p class="text-center font-weight-bold" style="font-size: 1.5rem;">You're about to end this man's whole career</p>
                <textarea id="message" class="form-control" rows="3" maxlength="50" style="resize: none;" placeholder="Some speech to this man?"></textarea>
            `,
            confirmButtonColor: '#DC3545',
            confirmButtonText: 'Yeah',
            showCancelButton: true,
            preConfirm: function() {
                rejectedMessage = message.value.trim().replace(/ {1,}/g, ' ')
            }
        }).then(function(result) {
            if(result.value) {
                try {
                    AJAXget(
                        `SELECT * FROM staff_admin_pre WHERE staffId='${thisManId}' AND status='pending'`,
                        function(data) {
                            if (data.status == 200) {
                                if (data.result.length == 0) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: `Sorry, this man just got free from your hand`,
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    thisManCard.parentNode.removeChild(thisManCard)
                                } else {
                                    AJAXsend(
                                        `UPDATE staff_admin_pre SET status='rejected', message='${rejectedMessage}' WHERE staffId='${thisManId}'`,
                                        function(data) {
                                            if (data.status == 200) {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: `What a shame`,
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                                thisManCard.parentNode.removeChild(thisManCard)
                                            } else {
                                                throw 'wrong one'
                                            }
                                        }
                                    )
                                }
                            } else {
                                throw 'wrong one'
                            }
                        }
                    )
                } catch (error) {
                    Swal.fire({
                        title: `Something went wrong`,
                        text: `${error}`,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => location.reload(true), 1500)
                }
            }
        })
    })
})

Array.prototype.forEach.call(document.getElementsByClassName('approve'), function(item) {
    item.addEventListener('click', function() {
        let thisManCard = this.parentNode.parentNode
        let thisManId = thisManCard.getElementsByClassName('userid')[0].textContent
        let thisManDepartment = thisManCard.getElementsByClassName('department')[0].textContent
        let thisManRole = thisManCard.getElementsByClassName('role')[0].textContent
        let [approveMessage, canCreate, canRead, canUpdate, canDelete] = ['', '', '', '', '']
        Swal.fire({
            title: `Give this man some Auth.`,
            html: `
                <img class="my-3" style="width: 80%; height: 200px;" src="https://media.tenor.com/images/2057f20854ca8a9fc52de07839cc60a1/tenor.gif">
                <div class="mx-auto mb-2" style="width: fit-content;">
                    <input id="createAuth" class="d-none" type="checkbox">
                    <label for="createAuth" class="btn m-1">CREATE</label>
                    <input id="readAuth" class="d-none" type="checkbox" checked="true">
                    <label for="readAuth" class="visible btn m-1">READ</label><br/>
                    <input id="updateAuth" class="d-none" type="checkbox">
                    <label for="updateAuth" class="btn m-1">UPDATE</label>
                    <input id="deleteAuth" class="d-none" type="checkbox">
                    <label for="deleteAuth" class="btn m-1">DELETE</label>
                </div>
                <textarea id="message" class="form-control" rows="3" maxlength="50" style="resize: none;" placeholder="Any gift to this man?"></textarea>
            `,
            focusConfirm: false,
            confirmButtonColor: '#28a745',
            confirmButtonText: 'FINISH',
            showCancelButton: true,
            preConfirm: function() {
                [approveMessage, canCreate, canRead, canUpdate, canDelete] = [
                    message.value.trim().replace(/ {1,}/g, ' '),
                    createAuth.checked.toString().substring(0, 1).toUpperCase(),
                    readAuth.checked.toString().substring(0, 1).toUpperCase(),
                    updateAuth.checked.toString().substring(0, 1).toUpperCase(),
                    deleteAuth.checked.toString().substring(0, 1).toUpperCase()
                ]
                if (canRead == 'F') {
                    canUpdate = 'F'
                    canDelete = 'F'
                }
            }
        }).then(function(result) {
            if (result.value) {
                try {
                    AJAXget(
                        `SELECT * FROM staff_admin_pre WHERE staffId='${thisManId}' AND status='pending'`,
                        function(data) {
                            if (data.status == 200) {
                                if (data.result.length == 0) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: `Sorry, this man just got free from your hand`,
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    thisManCard.parentNode.removeChild(thisManCard)
                                } else {
                                    AJAXsend(
                                        `UPDATE staff_admin_pre SET status='approved', message='${approveMessage}' WHERE staffId='${thisManId}'`,
                                        function(data) {
                                            if (data.status == 200) {
                                                AJAXsend(
                                                    `INSERT INTO staff_admin_info(staffId, department, role, status) VALUES('${thisManId}', '${thisManDepartment}', '${thisManRole}', 'active')`,
                                                    function(data) {
                                                        if (data.status == 200) {
                                                            AJAXsend(
                                                                `INSERT INTO staff_admin_CRUD VALUES('${thisManId}', '${canCreate}', '${canRead}', '${canUpdate}', '${canDelete}')`,
                                                                function(data) {
                                                                    if (data.status == 200) {
                                                                        Swal.fire({
                                                                            title: `Just a man passing through`,
                                                                            icon: 'success',
                                                                            showConfirmButton: false,
                                                                            timer: 1500
                                                                        })
                                                                        thisManCard.parentNode.removeChild(thisManCard)
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
                                            } else {
                                                throw 'wrong one'
                                            }
                                        }
                                    )
                                }
                            } else {
                                throw 'wrong one'
                            }
                        }
                    )
                } catch (error) {
                    Swal.fire({
                        title: `Something went wrong`,
                        text: `${error}`,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => location.reload(true), 1500)
                }
            }
        })
    })
})
