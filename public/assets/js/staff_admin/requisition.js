staffRecord = [
    {
        'Name': 'Rick Roll',
        'Department': 'No',
        'Desired salary' : '696969',
        'profile_picture': 'https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg'
    },
    {
        'Name': 'Rick Roll 2.0',
        'Department': 'Despacito HQ',
        'Desired salary' : '100',
        'profile_picture': 'https://static.stereogum.com/blogs.dir/2/files/2008/03/rickroll-still-compressed.jpg'
    },
    {
        'Name': 'Jeff',
        'Department': 'Street',
        'Desired salary' : '35000',
        'profile_picture': 'https://i.kym-cdn.com/entries/icons/original/000/016/894/mynameehhjeff.jpg'
    },

]
var backup = 0

var staffList = document.getElementsByTagName('staffList')[0]
var staffCard = staffList.getElementsByTagName('staffCard')[0]
var infos = staffCard.getElementsByTagName('infoStaff')[0]
var info = infos.getElementsByTagName('p')[0]
infos.removeChild(info)
staffList.removeChild(staffCard)
staffRecord.forEach(function(detail) {
    var newStaffCard = staffCard.cloneNode(true)
    var newInfo = info.cloneNode(true)
    newStaffCard.getElementsByTagName('profileStaff')[0].style.backgroundImage = `url('${detail['profile_picture']}')`
    delete detail['profile_picture']
    for (const [key, value] of Object.entries(detail)) {
        newInfo.getElementsByTagName('yTitle')[0].textContent = key
        newInfo.getElementsByTagName('yDetail')[0].textContent = value
        newStaffCard.getElementsByTagName('infoStaff')[0].appendChild(newInfo.cloneNode(true))
    }
    staffList.appendChild(newStaffCard)
})

function reject(){
    var conf = confirm("Are you sure?");
    if(conf){
        alert("Staff Rejected");
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

    alert("Staff Registered \nCRUD:"+document.getElementById("crudshow").value);

}
