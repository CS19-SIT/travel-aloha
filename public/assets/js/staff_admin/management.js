staffRecord = [
    {
        'firstname': 'Nino',
        'lastname': 'Nakano',
        'department': 'culinary',
        'profile': 'https://bit.ly/34BG24y'
    },
    {
        'firstname': 'Kurumi',
        'lastname': 'Tokisaki',
        'department': 'veterinary',
        'profile': 'https://i.ytimg.com/vi/HPynobNcZAU/hqdefault.jpg'
    },
    {
        'firstname': 'Shido',
        'lastname': 'Itsuka',
        'department': 'siscon',
        'profile': 'https://pbs.twimg.com/profile_images/820479236179783680/5EUm7iXl.jpg'
    },
    {
        'firstname': 'Jeanne',
        'lastname': 'd\'Arc',
        'department': 'saint',
        'profile': 'https://bit.ly/33jXREF'
    },
    {
        'firstname': 'Jibril',
        'lastname': 'Archangel',
        'department': 'bibliophile',
        'profile': 'https://bit.ly/2qlxCiS'
    },
    {
        'firstname': 'Origami',
        'lastname': 'Tobiichi',
        'department': 'soldier',
        'profile': 'https://66.media.tumblr.com/e69bd60591bf3765125db7fbc132316b/tumblr_ot5ic7qKwf1vy2tgqo7_250.jpg'
    }
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
    newStaffCard.getElementsByTagName('profileStaff')[0].style.backgroundImage = `url('${detail['profile']}')`
    delete detail['profile']
    for (const [key, value] of Object.entries(detail)) {
        newInfo.getElementsByTagName('yTitle')[0].textContent = key
        newInfo.getElementsByTagName('yDetail')[0].textContent = value
        newStaffCard.getElementsByTagName('infoStaff')[0].appendChild(newInfo.cloneNode(true))
    }
    staffList.appendChild(newStaffCard)
})