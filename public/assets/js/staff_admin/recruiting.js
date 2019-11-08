//const testQuery = require("../../../server/models/staff_recruiting");
//console.log(testQuery.test);

var existedInformation = [
	{
		'firstname': 'Nino',
		'lastname': 'Nakano'
	}
];

existedInformation = data[0]
var userId = existedInformation['user_id']
existedInformation['birth_date'] = new Date(existedInformation['birth_date']).toDateString().substring(4) 
delete existedInformation['user_id']
delete existedInformation['password']
delete existedInformation['profile_picture']

var exInfos = document.getElementsByTagName('existedInformation')[0]
var exInfo = exInfos.getElementsByTagName('p')[0]
exInfos.removeChild(exInfo)
for (const [key, value] of Object.entries(existedInformation)) {
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
			'${userId}',
			'${newInformation['department']}',
			${newInformation['salary']}
		)
	`
	sqlStatement = sqlStatement.replace(/\t/g, ' ').replace(/\n/g, '').trim()
	alert(sqlStatement)
})
