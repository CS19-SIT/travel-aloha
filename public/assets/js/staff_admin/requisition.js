
/*
var StaffList = [
    {
        'slot1' : 'haha yes',
        'slot2' : 'why tho ajoserjwipai;oewjgt;ieosruyjhs;oriuay;ertgsaertaerterataertaert',
        '...' : 'why'
    },
    {
        'slot1' : 's',
        'slot2' : 't'
    }
]
for(i = 0; i<StaffList.length;i++){
    var infos = document.getElementsByTagName('StaffList')[i];
	var info = infos.getElementsByTagName('p')[i];
	infos.removeChild(info)
	for (const [key, value] of Object.entries(StaffList[i])) {
  		info.getElementsByTagName('keyy')[i].textContent = key
		info.getElementsByTagName('valuee')[i].textContent = value
		infos.appendChild(info.cloneNode(true))
    }
}
*/

function reject(){
    var conf = confirm("Are you sure?");
    if(conf){
        alert("Staff Rejected");
    }
    else{
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

}
