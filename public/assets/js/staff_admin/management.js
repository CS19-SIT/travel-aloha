staffRecord = [
    {
        'user_id': '001',
        'name': 'Nino Nakano',
        'department': 'culinary',
        'role': 'best girl',
        'profile_picture': 'https://bit.ly/2NJfJ5n'
    },
    {
        'user_id': '002',
        'name': 'Kurumi Tokisaki',
        'department': 'veterinary',
        'role': 'best girl',
        'profile_picture': 'https://i.ytimg.com/vi/HPynobNcZAU/hqdefault.jpg'
    },
    {
        'user_id': '003',
        'name': 'Shido Itsuka',
        'department': 'housewife',
        'role': 'best boy',
        'profile_picture': 'https://pbs.twimg.com/profile_images/820479236179783680/5EUm7iXl.jpg'
    },
    {
        'user_id': '004',
        'name': 'Jeanne d\'Arc',
        'department': 'saint',
        'role': 'best girl',
        'profile_picture': 'https://bit.ly/2JW2wVX'
    },
    {
        'user_id': '005',
        'name': 'Jibril Archangel',
        'department': 'bibliophile',
        'role': 'best girl',
        'profile_picture': 'https://bit.ly/2qlxCiS'
    },
    {
        'user_id': '006',
        'name': 'Origami Tobiichi',
        'department': 'soldier',
        'role': 'best girl',
        'profile_picture': 'https://66.media.tumblr.com/e69bd60591bf3765125db7fbc132316b/tumblr_ot5ic7qKwf1vy2tgqo7_250.jpg'
    },
    {
        'user_id': '007',
        'name': 'Ririna Sanada',
        'department': 'student',
        'role': 'best girl',
        'profile_picture': 'https://pbs.twimg.com/media/D18bKiaXQAMzT4q.jpg'
    },
    {
        'user_id': '008',
        'name': 'Mikoto Misaka',
        'department': 'student',
        'role': 'best girl',
        'profile_picture': 'http://www.ah.xinhuanet.com/2015-04/09/1114914317_14285490003871n.jpg'
    }
]

if (canRead == 'true') {
    let updateList = new Set()
    let deleteList = new Set()
    let editableList = new Set(['department', 'role'])
    let staffList = document.getElementsByTagName('staffList')[0]
    let staffCard = staffList.getElementsByTagName('staffCard')[0]
    let infos = staffCard.getElementsByTagName('information')[0]
    let info = infos.getElementsByTagName('p')[0]
    infos.removeChild(info)
    staffList.removeChild(staffCard)
    let generateStaffCard = function (staffs, isMockup) {
        if (!staffs) return
        staffs.forEach(function(staff) {
            let newStaffCard = staffCard.cloneNode(true)
            let newInfo = info.cloneNode(true)
            newStaffCard.getElementsByTagName('profilePicture')[0].style.backgroundImage = `url('${staff['profile_picture']}')`
            delete staff['profile_picture']
            newStaffCard.getElementsByClassName('user_id')[0].textContent = staff['user_id']
            delete staff['user_id']
            for (const [key, value] of Object.entries(staff)) {
                newInfo.getElementsByTagName('yTitle')[0].textContent = key
                newInfo.getElementsByTagName('yDetail')[0].textContent = value
                if (editableList.has(key)) {
                    newInfo.getElementsByTagName('yDetail')[0].className = '' + key
                }
                newStaffCard.getElementsByTagName('information')[0].appendChild(newInfo.cloneNode(true))
            }
            staffList.appendChild(newStaffCard)
        })
        if (canUpdate == 'true') {
            Array.prototype.forEach.call(document.getElementsByClassName('editButton'), function(item, index) {
                item.addEventListener('click', function() {
                    let thisStaffInfo = this.parentNode.parentNode.getElementsByTagName('information')[0]
                    let strInput = [...editableList].map(function(s) {
                        return `<div class="form-group">
                        <label for="${s}">${s}</label>
                        <input type="text" class="form-control" id="${s}" value="${thisStaffInfo.getElementsByClassName(s)[0].textContent}">
                      </div>`
                    }).join('')
                    Swal.fire({
                        title: 'Edit some information',
                        html: strInput,
                        focusConfirm: false,
                        showCancelButton: true,
                        preConfirm: function() {
                            [...editableList].forEach(function(item) {
                                if (thisStaffInfo.getElementsByClassName(item)[0].textContent != document.getElementById(item).value) {
                                    thisStaffInfo.getElementsByClassName(item)[0].textContent = document.getElementById(item).value
                                    thisStaffInfo.getElementsByClassName(item)[0].parentNode.classList.add('isChanged')
                                }
                            })
                        }
                    })
                })
            })
        }
        if (canDelete == 'true') {
            Array.prototype.forEach.call(document.getElementsByClassName('deleteButton'), function(item, index) {
                item.addEventListener('click', function() {
                    let selec = this
                    Swal.fire({
                        icon: 'warning',
                        title: 'Do you really want to delete?',
                        showCancelButton: true
                    }).then(function(result) {
                        if (result.value) {
                            let thisStaff = selec.parentNode.parentNode
                            deleteList.add(thisStaff.getElementsByClassName('user_id')[0].textContent)
                            staffList.removeChild(thisStaff)
                        }
                    })
                })
            })
        }
        if (isMockup) {
            return
        }
        if (canUpdate == 'true' || canDelete == 'true') {
            document.getElementById('save').addEventListener('click', function() {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure?',
                    html: 'The current information<br/>will be updated in the server',
                    showCancelButton: true
                }).then(function(result) {
                    if (result.value) {
                        $.ajax({
                            url: '/admin/staff/getQuery',
                            method: 'POST',
                            data: {
                                sql: `SELECT * FROM staff_admin_info WHERE status='inactive'`
                            }
                        }).done(function(data, textStatus, jqXHR) {
                            if (data.status == 200) {
                                let denied = 'false'
                                for (let i = 0; i < data.result.length; ++i) {
                                    if (updateList.has(data.result[i]['user_id'])) {
                                        denied = 'true'
                                        break
                                    }
                                }
                                if (denied == 'false') {
                                    console.log('Staff who was just changed to be inactive status: 0')
                                    // Then we will be able to update info without getting problems
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Some',
                                        showConfirmButton: false,
                                        timer: 1200
                                    })
                                }
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops, something went wrong',
                                    showConfirmButton: false,
                                    timer: 1200
                                })
                            }
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oh, the problem occurs',
                                showConfirmButton: false,
                                timer: 1200
                            })
                        })
                    }
                })
            })
        }
    }

    Swal.fire({
        icon: 'info',
        title: 'Mockup?',
        text: 'We recommend to use mockup first\n\'Save\' system are still in development',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes, use mockup',
        cancelButtonText: 'No, don\'t use mockup'
    }).then(function(result) {
        if (result.value) {
            generateStaffCard(staffRecord, false)
        } else {
            generateStaffCard(data, true)
        }
    })
}
