document.addEventListener('DOMContentLoaded', function() {
	alert('Requisition Test')
});

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

function approve(){
    var crud = 
    prompt("Please edit these 4 binary number to Manage the CRUD(Create Read Update Delete) for the selected staff"+
    "\n 1 = True and 0 = False\n C R U D is the order","0100");
    if(crud.match(/[0-1]{4}$/) && crud.length == 4){
        alert("ok");
    }
    else{
        alert("error!");
    }

   
}

function reject(){
    var conf = confirm("Are you sure?");
    if(conf){
        alert("rip");
    }
    else{
        
    }
}
    