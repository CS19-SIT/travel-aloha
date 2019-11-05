staffRecord = [
    {
        'firstname': 'Nino',
        'lastname': 'Nakano',
        'department': 'culinary'
    },
    {
        'firstname': 'Kurumi',
        'lastname': 'Tokisaki',
        'department': 'veterinary'
    },
    {
        'firstname': 'Shido',
        'lastname': 'Itsuka',
        'department': 'siscon'
    },
    {
        'firstname': 'Jeanne',
        'lastname': 'd\'Arc',
        'department': 'saint'
    },
    {
        'firstname': 'Jibril',
        'lastname': 'Archangel',
        'department': 'bibliophile'
    },
]

var staffList = document.getElementsByTagName('staffList')[0]
var staffCard = staffList.getElementsByTagName('staffCard')[0]
var infos = staffCard.getElementsByTagName('infoStaff')[0]
var info = infos.getElementsByTagName('p')[0]
infos.removeChild(info)
staffList.removeChild(staffCard)
staffRecord.forEach(function(detail) {
    var newStaffCard = staffCard.cloneNode(true)
    var newInfo = info.cloneNode(true)
    
    // newStaffCard.getElementsByTagName('profileStaff').css.backgroundImage = .....
    for (const [key, value] of Object.entries(detail)) {
        newInfo.getElementsByTagName('yTitle')[0].textContent = key
        newInfo.getElementsByTagName('yDetail')[0].textContent = value
        newStaffCard.getElementsByTagName('infoStaff')[0].appendChild(newInfo.cloneNode(true))
    }
    staffList.appendChild(newStaffCard)
})