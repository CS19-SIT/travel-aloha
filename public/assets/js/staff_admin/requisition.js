Array.prototype.forEach.call(document.getElementsByClassName('reject'), function(item) {
    item.addEventListener('click', function() {
        let thisManCard = this.parentNode.parentNode
        let thisManId = thisManCard.getElementsByClassName('userid')[0].textContent
        Swal.fire({
            html: `
                <img class="my-3" style="width: 80%; height: 200px;" src="https://i.kym-cdn.com/entries/icons/original/000/028/223/hmlspst6qjo11.jpg">
                <p class="text-center font-weight-bold" style="font-size: 1.5rem;">You're about to end this man's whole career</p>
            `,
            showCancelButton: true
        }).then(function(result) {
            if(result.value) {
                $.ajax({
                    url: '/admin/staff/getQuery',
                    method: 'POST',
                    data: {
                        sql: `SELECT * FROM staff_admin_info WHERE staffId='${thisManId}' AND status='active'`
                    }
                }).done(function(data) {
                    if (data.status == 200) {
                        if (data.result.length) {
                            Swal.fire({
                                icon: 'error',
                                title: `Sorry, this man just got away from your hand`,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(function(){
                                location.reload(true)
                            }, 1500)   
                        } else {
                            try {
                                $.ajax({
                                    url: '/admin/staff/sendQuery',
                                    method: 'POST',
                                    data: {
                                        sql: `DELETE FROM staff_admin_CRUD WHERE staffId='${thisManId}'`
                                    }
                                }).done(function(data) {
                                    if (data.status == 200) {
                                        $.ajax({
                                            url: '/admin/staff/sendQuery',
                                            method: 'POST',
                                            data: {
                                                sql: `DELETE FROM staff_admin_info WHERE staffId='${thisManId}'`
                                            }
                                        }).done(function(data) {
                                            if (data.status == 200) {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: `What a shame`,
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                                thisManCard.parentNode.removeChild(thisManCard)
                                            } else {
                                                throw 'Wrong one'                  
                                            }
                                        })
                                    } else {
                                        throw 'Wrong one'
                                    }
                                })
                            } catch {
                                Swal.fire({
                                    icon: 'error',
                                    title: `Something went wrong`,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                setTimeout(function(){
                                    location.reload(true)
                                }, 1500)
                            }
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: `Something went wrong`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(function(){
                            location.reload(true)
                        }, 1500)
                    }
                })
            }
        })
    })
})

Array.prototype.forEach.call(document.getElementsByClassName('approve'), function(item) {
    item.addEventListener('click', function() {
        let thisManCard = this.parentNode.parentNode
        let thisManId = thisManCard.getElementsByClassName('userid')[0].textContent
        Swal.fire({
            title: `Give this man some Auth.`,
            html: `
                <img class="my-3" style="width: 80%; height: 200px;" src="https://i.kym-cdn.com/entries/icons/original/000/010/843/ricardo.jpg">
                <div class="m-auto" style="width: fit-content;">
                    <input id="createAuth" class="d-none" type="checkbox">
                    <label for="createAuth" class="btn m-1">CREATE</label>
                    <input id="readAuth" class="d-none" type="checkbox" checked="true">
                    <label for="readAuth" class="visible btn m-1">READ</label><br/>
                    <input id="updateAuth" class="d-none" type="checkbox">
                    <label for="updateAuth" class="btn m-1">UPDATE</label>
                    <input id="deleteAuth" class="d-none" type="checkbox">
                    <label for="deleteAuth" class="btn m-1">DELETE</label>
                </div>
            `,
            focusConfirm: false,
            confirmButtonColor: '#28a745',
            showCancelButton: true,
            preConfirm: function() {
                let [canCreate, canRead, canUpdate, canDelete] = [
                    createAuth.checked.toString().substring(0, 1).toUpperCase(),
                    readAuth.checked.toString().substring(0, 1).toUpperCase(),
                    updateAuth.checked.toString().substring(0, 1).toUpperCase(),
                    deleteAuth.checked.toString().substring(0, 1).toUpperCase()
                ]
                if (canRead == 'F') {
                    canUpdate = 'F'
                    canDelete = 'F'
                }
                $.ajax({
                    url: '/admin/staff/sendQuery',
                    method: 'POST',
                    data: {
                        sql: `UPDATE staff_admin_info SET status='active' WHERE staffId='${thisManId}'`
                    }
                }).done(function(data) {
                    if (data.status == 200) {
                        $.ajax({
                            url: '/admin/staff/sendQuery',
                            method: 'POST',
                            data: {
                                sql: `INSERT INTO staff_admin_CRUD VALUES('${thisManId}', '${canCreate}', '${canRead}', '${canUpdate}', '${canDelete}') ON DUPLICATE KEY UPDATE can_create=VALUES(can_create), can_read=VALUES(can_read), can_update=VALUES(can_update), can_delete=VALUES(can_delete)`
                            }
                        }).done(function(data) {
                            if (data.status == 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: `Just a poor man passing through`,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                thisManCard.parentNode.removeChild(thisManCard)
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: `Eew`,
                                    text: `This man just got nothing in CRUD system`,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                setTimeout(function(){
                                    location.reload(true)
                                }, 1500)            
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: `Something went wrong`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(function(){
                            location.reload(true)
                        }, 1500)
                    }
                })
            }
        })
    })
})
