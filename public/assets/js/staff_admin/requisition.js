<<<<<<< HEAD
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
=======
staffRecord = [
    {
        'StaffID' : '111',
        'Name': 'Rick Roll',
        'Department': 'No',
        'Role' : 'not fixed',
        'profile_picture': 'https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg'
    },
    {
        'StaffID' : '116',
        'Name': 'Rick Roll 2.0',
        'Department': 'Despacito HQ',
        'Role' : 'Singer',
        'profile_picture': 'https://static.stereogum.com/blogs.dir/2/files/2008/03/rickroll-still-compressed.jpg'
    },
    {
        'StaffID' : '117',
        'Name': 'Jeff',
        'Department': 'Street',
        'Role' : 'Detective',
        'profile_picture': 'https://i.kym-cdn.com/entries/icons/original/000/016/894/mynameehhjeff.jpg'
    },
    {
        'StaffID' : '118',
        'Name': 'Chen',
        'Department': 'Bicycler',
        'Role' : 'Honk Honk',
        'profile_picture': 'http://i.imgur.com/WE3suWE.png?1'
    },
    

]

if(canCreate == 'true'){
    let thisStaffId='0'; let cC='F';   let cR='F';   let cU='F';   let cD='F'
    const TheForm = new Set(['Create','Read','Update','Delete'])
    var staffList = document.getElementsByTagName('staffList')[0]
    var staffCard = staffList.getElementsByTagName('staffCard')[0]
    var infos = staffCard.getElementsByTagName('infoStaff')[0]
    var info = infos.getElementsByTagName('p')[0]
    infos.removeChild(info)
    staffList.removeChild(staffCard)

    let generateStaffCard = function(staffs, isMockup) {
        staffs.forEach(function(detail) {
            var newStaffCard = staffCard.cloneNode(true)
            var newInfo = info.cloneNode(true)
            if (detail['profile_picture']) {
               newStaffCard.getElementsByTagName('profileStaff')[0].style.backgroundImage = `url('${detail['profile_picture']}')`
           }
            delete detail['profile_picture']
            newStaffCard.getElementsByClassName('staffID')[0].textContent = detail['staffID']
            for (const [key, value] of Object.entries(detail)) {
                newInfo.getElementsByTagName('yTitle')[0].textContent = key
                newInfo.getElementsByTagName('yDetail')[0].textContent = value
                newStaffCard.getElementsByTagName('infoStaff')[0].appendChild(newInfo.cloneNode(true))
>>>>>>> 8a099354206cef0b98dab5f35c870ee72c079345
            }
        })
<<<<<<< HEAD
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
                    document.getElementById('create').checked.toString().substring(0, 1).toUppercase(),
                    document.getElementById('reade').checked.toString().substring(0, 1).toUppercase(),
                    document.getElementById('update').checked.toString().substring(0, 1).toUppercase(),
                    document.getElementById('delete').checked.toString().substring(0, 1).toUppercase()
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
=======
        Array.prototype.forEach.call(document.getElementsByClassName('stapprove'), function(item, index) {
            item.addEventListener('click', function() {
                let thisStaffCard = this.parentNode.parentNode
                let strInput = Array.from(TheForm, function(s) {
                    return `<div class="form-group">
                    <label for="${s}">${s}</label>
                    <input type="checkbox" class="form-control" id="${s}">
                    </div>`
                }).join('')
                Swal.fire({
                    title: '<b>HTML Staff Approval</b>',
                    icon:'warning',
                    html: 'Please select which permission you will give to this staff?'+strInput,
                    focusConfirm: false,
                    showCancelButton: true,
                    cancelButtonColor: 'green',
                    preConfirm: function() {
                        [...TheForm].forEach(function(item) {
                            thisStaffId = thisStaffCard.getElementsByClassName('staffID')[0].textContent
                            cC = (document.getElementById('Create').checked).toString().substring(0,1).toUpperCase()
                            cR = (document.getElementById('Read').checked).toString().substring(0,1).toUpperCase()
                            cU = (document.getElementById('Update').checked).toString().substring(0,1).toUpperCase()
                            cD = (document.getElementById('Delete').checked).toString().substring(0,1).toUpperCase()
                        })
                    }
                }).then(function(result){
                    if(result.value){
                        Swal.fire({
                            icon: 'question',
                            title: '<b>Are you sure?</b>',
                            text: 'C R U D : '+cC+" "+cR+" "+cU+" "+cD,
                            showCancelButton: true,
                            cancelButtonColor: 'green',
                            confirmButtonColor: 'blue',
                            confirmButtonText: 'APPROVE',
                            cancelButtonText: 'No'
                        }).then(function(result){
                            if(result.value){
                                /*$.ajax({
                                    url: '/admin/staff/sendQuery',
                                    method: 'POST',
                                    data: {
                                        sql: `UPDATE staff_admin_info SET status='active' WHERE staffID = ('${thisStaffId}')`
                                    }  
                                })
                                $.ajax({
                                    url: '/admin/staff/sendQuery',
                                    method: 'POST',
                                    data: {
                                        sql: `INSERT INTO staff_admin_CRUD VALUES ('${thisStaffId}','${cC}','${cR}','${cU}','${cD}') 
                                        ON DUPLICATE KEY UPDATE can_create=VALUES('${cC}'), can_read=VALUES('${cR}'), can_update=VALUES('${cU}'), can_delete=VALUES('${cD}')`
                                    }  
                                }).done(function(data, textStatus, jqXHR) {
                                    if (data.status == 200) {
                                        callback(function() {
                                            refreshPage(1200)
                                        })
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Something went wrong!',
                                            showConfirmButton: false,
                                            timer: 1200
                                        })
                                        setTimeout(function() {
                                            location.reload(true)
                                        }, 1200) 
                                    }
                                })*/
>>>>>>> 8a099354206cef0b98dab5f35c870ee72c079345
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
<<<<<<< HEAD
            }
        })
=======
            })
        
    })
    
    }
    
    Swal.fire({
        icon: 'info',
        title: 'Use Mockup?',
        text: 'Some system are still in development, would you like to use the mockup version?',
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
>>>>>>> 8a099354206cef0b98dab5f35c870ee72c079345
    })
})