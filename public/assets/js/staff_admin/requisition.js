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
            }
            staffList.appendChild(newStaffCard)
        })
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
                                Swal.fire({
                                    icon:'success',
                                    title: 'Staff Approved!',
                                    showConfirmButton: false,
                                    timer: 1000
                                })
                                setTimeout(function() {
                                 location.reload(true)
                             }, 1200) }else{}
                        })
                    }else{}
                })
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
    })

 }


 
/*function reject(){
    
    var conf = confirm("Are you sure?");
    if(conf){   
    Swal.fire({
    icon: 'error',
    title: 'Rejected',
    text: 'You reject the application form',
  })    
    }
    else{
    }
}*/

function reject(){
    Swal.fire({
        icon: 'warning',
        title: '<h1 style="color:red">Are you sure?</h1>',
        html: '<h2 style="color:red">This action cannot be undone!</h2>',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    }).then(function(result) {
        if (result.value) {
           Swal.fire({
               icon: 'error',
               title:'Staff Rejected',
               showConfirmButton: false,
               timer: 1000
           })
           setTimeout(function() {
            location.reload(true)
        }, 1200)
        } else {
            
        }
    })
}


function showUD(){
    if (cU.style.display === "none") {
        cU.style.display = "inline";
      } else {
        cU.style.display = "none";
        document.getElementById("cU").checked = false;
      }
    if (cD.style.display === "none") {
        cD.style.display = "inline";
      } else {
        document.getElementById("cD").checked = false;
        cD.style.display = "none";
      }  

    }

function confirmCRUD(){
    var cC = document.getElementById("cC").checked; var cR = document.getElementById("cR").checked;
    var cU = document.getElementById("cU").checked; var cD = document.getElementById("cD").checked;
    document.getElementById("crudshow").value = "";
    document.getElementById("crudshow").append("asdasd");
    if(cC){
        document.getElementById("crudshow").value+="1";
    } else{
        document.getElementById("crudshow").value+="0";
    }

    if(cR){
        document.getElementById("crudshow").value+="1";
    } else{
        document.getElementById("crudshow").value+="0";
    }

    if(cU){
        document.getElementById("crudshow").value+="1";
    } else{
        document.getElementById("crudshow").value+="0";
    }

    if(cD){
        document.getElementById("crudshow").value+="1";
    } else{
        document.getElementById("crudshow").value+="0";
    }

    if(document.getElementById("crudshow").value == "0000"){
        alert("You didn't check any checkbox");
    }
    if(confirm("Complete the approval?")){
    // SEND DATA HERE
    Swal.fire({
        icon: 'success',
        title: 'Staff Approved!',
        text: 'Staff CRUD : '+document.getElementById("crudshow").value,
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(function() {
        location.reload(true)
    }, 1200)
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Approval canceled',
        })   
    }
}
