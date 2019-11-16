staffRecord = [
    {
        'ID' : '111',
        'Name': 'Rick Roll',
        'Department': 'No',
        'Role' : 'not fixed',
        'profile_picture': 'https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg'
    },
    {
        'ID' : '116',
        'Name': 'Rick Roll 2.0',
        'Department': 'Despacito HQ',
        'Role' : 'Singer',
        'profile_picture': 'https://static.stereogum.com/blogs.dir/2/files/2008/03/rickroll-still-compressed.jpg'
    },
    {
        'ID' : '117',
        'Name': 'Jeff',
        'Department': 'Street',
        'Role' : 'Detective',
        'profile_picture': 'https://i.kym-cdn.com/entries/icons/original/000/016/894/mynameehhjeff.jpg'
    },
    {
        'ID' : '118',
        'Name': 'Chen',
        'Department': 'Bicycler',
        'Role' : 'Honk Honk',
        'profile_picture': 'http://i.imgur.com/WE3suWE.png?1'
    },
    

]

if(canCreate == 'true'){
    const TheForm = new Set(['cC','cR','cU','cD'])
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
            newStaffCard.getElementsByClassName('user_id')[0].textContent = detail['user_id']
            for (const [key, value] of Object.entries(detail)) {
                newInfo.getElementsByTagName('yTitle')[0].textContent = key
                newInfo.getElementsByTagName('yDetail')[0].textContent = value
                newStaffCard.getElementsByTagName('infoStaff')[0].appendChild(newInfo.cloneNode(true))
            }
            staffList.appendChild(newStaffCard)
        })
        /*Array.prototype.forEach.call(document.getElementsByClassName('stapprove'), function(item, index) {
            item.addEventListener('click', function() {
                let thisStaffCard = this.parentNode.parentNode
                let strInput = Array.from(TheForm, function(s) {
                    return `<div class="form-group">
                    <label for="${s}">${s}</label>
                    <input type="text" class="form-control" id="${s}" placeholder="${thisStaffCard.getElementsByClassName(s)[0].textContent}">
                </div>`
                }).join('')
                Swal.fire({
                    title: 'Staff CRUD',
                    text:'Please select which permission you will give to this staff?',
                    html: strInput,
                    focusConfirm: false,
                    showCancelButton: true,
                    preConfirm: function() {
                        [...TheForm].forEach(function(item) {
                            
                        })
                    }
                })
            })
        }*/
        
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


 
function reject(){
    
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
