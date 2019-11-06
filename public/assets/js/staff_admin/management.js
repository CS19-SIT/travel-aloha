staffRecord = [
    {
        'name': 'Nino Nakano',
        'department': 'culinary',
        'profile_picture': 'https://bit.ly/2NJfJ5n'
    },
    {
        'name': 'Kurumi Tokisaki',
        'department': 'veterinary',
        'profile_picture': 'https://i.ytimg.com/vi/HPynobNcZAU/hqdefault.jpg'
    },
    {
        'name': 'Shido Itsuka',
        'department': 'housewife',
        'profile_picture': 'https://pbs.twimg.com/profile_images/820479236179783680/5EUm7iXl.jpg'
    },
    {
        'name': 'Jeanne d\'Arc',
        'department': 'saint',
        'profile_picture': 'https://bit.ly/2JW2wVX'
    },
    {
        'name': 'Jibril Archangel',
        'department': 'bibliophile',
        'profile_picture': 'https://bit.ly/2qlxCiS'
    },
    {
        'name': 'Origami Tobiichi',
        'department': 'soldier',
        'profile_picture': 'https://66.media.tumblr.com/e69bd60591bf3765125db7fbc132316b/tumblr_ot5ic7qKwf1vy2tgqo7_250.jpg'
    },
    {
        'name': 'Ririna Sanada',
        'department': 'student',
        'profile_picture': 'https://pbs.twimg.com/media/D18bKiaXQAMzT4q.jpg'
    },
    {
        'name': 'Mikoto Misaka',
        'department': 'student',
        'profile_picture': 'http://www.ah.xinhuanet.com/2015-04/09/1114914317_14285490003871n.jpg'
    }
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