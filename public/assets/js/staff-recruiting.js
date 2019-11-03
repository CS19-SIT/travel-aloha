document.addEventListener('DOMContentLoaded', function() {
	/**
	 * Query all needed information of the user 
	 * (please include their 'user-id' to make us can insert info to table correctly)
	 * .... and I mean info of the current user who just came to this page
	 * {Just for making them know it is really their information??}
	 * and keeps them in a variable names 'result'
	 * ex. var existedInformation = your_query("SELECT ^&#&#^")
	 */
	// Example of query (get only 1 row)
	var existedInformation = [
		{
			'user-id': 'abcd-efgh-ijkl-mnop',
			'firstname': 'Burning',
			'lastname': 'Fighting Fighter',
			'birthdate': '1999/12/31'
		}
	]

	// Then starts generate their information
	var exInfos = document.getElementsByTagName('existedInformation')[0]
	var exInfo = exInfos.getElementsByTagName('p')[0]
	exInfos.removeChild(exInfo)
	for (const [key, value] of Object.entries(existedInformation[0])) {
  		exInfo.getElementsByTagName('yTitle')[0].textContent = key
		exInfo.getElementsByTagName('yDetail')[0].textContent = value
		exInfos.appendChild(exInfo.cloneNode(true))
	}

	// After adding more information
	document.getElementById('submitButton').addEventListener('click', function() {
		// Provide input checker
		// Example of a way to get info from html
		// the values after || made for default value if they didn't type anything
		newInformation = {
			'department': document.getElementById('department').value || 'Computer Science',
			'salary': document.getElementById('salary').value || 0
		} // Not complete yet, still need regex to check pattern of the inputs
		var sqlStatement = `
			INSERT INTO staff VALUES (
				'${existedInformation[0]['user-id']}',
				'${newInformation['department']}',
				${newInformation['salary']}
			)
		`
		// replace all tabs with a space
		sqlStatement = sqlStatement.replace(/\t/g, ' ') 
		alert(sqlStatement)
		// execute this sqlStatement
	})
})