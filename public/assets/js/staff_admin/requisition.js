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
                        sql: `SELECT * FROM staff_admin_info WHERE staffID='${thisManId}' AND status='active'`
                    }
                }).done(function(data, textStatus, jqXHR) {
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
                            $.ajax({
                                url: '/admin/staff/sendQuery',
                                method: 'POST',
                                data: {
                                    sql: `DELETE FROM staff_admin_info WHERE staffId='${thisManId}'`
                                }
                            }).done(function(data, textStatus, jqXHR) {
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
            title: `Give the Auth to this man`,
            html: `
                <img class="my-3" style="width: 80%; height: 200px;" src="https://i.kym-cdn.com/entries/icons/original/000/010/843/ricardo.jpg">
                <div class="m-auto text-left" style="width: fit-content;">
                    <input id="create" class="m-2" type="checkbox" style="transform: scale(2);">
                    <label for="create">Ability to create an army</label>
                    <br/><input id="read" class="m-2" type="checkbox" style="transform: scale(2);">
                    <label for="read" class="visible">Ability to read people information</label>
                    <br/><input id="update" class="m-2" type="checkbox" style="transform: scale(2);">
                    <label for="update">Ability to change people mind</label>
                    <br/><input id="delete" class="m-2" type="checkbox" style="transform: scale(2);">
                    <label for="delete">Ability to end a man's whole career</label>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: function() {
                let [canCreate, canRead, canUpdate, canDelete] = [
                    document.getElementById('create').checked.toString().substring(0, 1).toUpperCase(),
                    document.getElementById('reade').checked.toString().substring(0, 1).toUpperCase(),
                    document.getElementById('update').checked.toString().substring(0, 1).toUpperCase(),
                    document.getElementById('delete').checked.toString().substring(0, 1).toUpperCase()
                ]
                if (canRead == 'F') {
                    canUpdate = 'F'
                    canDelete = 'F'
                }
                $.ajax({
                    url: '/admin/staff/sendQuery',
                    method: 'POST',
                    data: {
                        sql: `UPDATE staff_admin_info SET status='active' WHERE staffId='${deletedStaffs}'`
                    }
                }).done(function() {
                    if (data.status == 200) {
                        $.ajax({
                            url: '/admin/staff/sendQuery',
                            method: 'POST',
                            data: {
                                sql: `INSERT INTO staff_admin_CRUD VALUES('${thisManId}', '${canCreate}', '${canRead}', '${canUpdate}', '${canDelete}') ON DUPLICATE KEY UPDATE can_create=VALUES(can_create), can_read=VALUES(can_read), can_update=VALUES(can_update), can_delete=VALUES(can_delete)`
                            }
                        }).done(function(data, textStatus, jqXHR) {
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
