//const testQuery = require("../../../server/models/staff_recruiting");
//console.log(testQuery.test);

var existedInformation = [
	{
		'firstname': 'Nino',
		'lastname': 'Nakano'
	}
];

var exInfos = document.getElementsByTagName('existedInformation')[0]
var exInfo = exInfos.getElementsByTagName('p')[0]
exInfos.removeChild(exInfo)
for (const [key, value] of Object.entries(existedInformation[0])) {
	exInfo.getElementsByTagName('yTitle')[0].textContent = key
	exInfo.getElementsByTagName('yDetail')[0].textContent = value
	exInfos.appendChild(exInfo.cloneNode(true))
}

document.getElementById('submitButton').addEventListener('click', function() {
	newInformation = {
		'department': document.getElementById('department').value || 'Computer Science',
		'salary': document.getElementById('salary').value || 0
	}
	var sqlStatement = `
		INSERT INTO staff VALUES (
			'${existedInformation[0]['user-id']}',
			'${newInformation['department']}',
			${newInformation['salary']}
		)
	`
	sqlStatement = sqlStatement.replace(/\t/g, ' ') 
	alert(sqlStatement)
})
