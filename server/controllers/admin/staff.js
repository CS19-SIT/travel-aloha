const connector = require('../../db/db')


exports.getIndex = function(request, response) {
    response.render('staff_admin/index', {
        pageTitle: 'TravelAloha - StaffManagement',
        user: request.user,
    })
}

exports.getApplicationForm = async function(request, response) {
    try {
        let staffStatus = await connector.query(`SELECT * FROM staff_admin_info WHERE staffId='${request.user.user_id}'`)
        if (staffStatus[0].length) {
            if (staffStatus[0][0]['status'] == 'active') {
                staffStatus = 'active'
            } else if (staffStatus[0][0]['status'] == 'pending') {
                staffStatus = 'pending'
            } else {
                staffStatus = 'inactive'
            }
        } else {
            staffStatus = 'user'
        }
        if (staffStatus == 'active') {
            response.redirect('/admin/staff/management')
        }
        let matchedInfo = await connector.query(`SELECT user_id, birth_date, profile_picture, username, CONCAT(firstname, ' ', lastname) AS name, gender, address FROM user WHERE user_id='${request.user.user_id}'`)
        response.render('staff_admin/recruiting', {
            pageTitle: 'TravelAloha - StaffRecruiting',
            user: request.user,
            onPending: (staffStatus == 'pending')?'true':'false',
            isDisband: (staffStatus == 'inactive')?'true':'false',
            data: JSON.stringify(matchedInfo[0][0])
        })
    } catch (error) {
        response.send(`
            <!DOCTYPE html><head><title>Oops</title></head>
            <body><p>Something was wrong !! ${error} </p></body>
        `)
    }
}

exports.getStaffCandidatesList = function(request, response) {
    response.render('staff_admin/requisition', {
        pageTitle: 'TravelAloha - StaffRequisition',
        user: request.user,
    })
}

exports.getDetailAllExistedStaff = function(request, response) {
    try {
        // let staffStatus = await connector.query(`SELECT * FROM staff_admin_info WHERE staffId='${request.user.user_id}'`)
        // if (staffStatus[0].length && staffStatus[0][0]['status'] != 'active') {
        //     response.redirect('/admin/staff/recruiting')
        // }
        // let staffList = await connector.query(`SELECT user_id, birth_date, profile_picture, CONCAT(firstname, ' ', lastname) AS name, gender, address, department, role FROM user, staff_admin_info`)
        // let userAuth = await connector.query(`SELECT * FROM staff_admin_CRUD WHERE staffID = '${request.user.user_id}'`)
        // response.render('staff_admin/management', {
        //     pageTitle: 'TravelAloha - StaffManagement',
        //     user: request.user,
        //     canCreate: (userAuth[0][0]['can_create']=='T')?'true':'false',
        //     canRead: (userAuth[0][0]['can_read']=='T')?'true':'false',
        //     canUpdate: (userAuth[0][0]['can_update']=='T')?'true':'false',
        //     canDelete: (userAuth[0][0]['can_delete']=='T')?'true':'false',
        //     data: JSON.stringify(staffList[0])
        // })
        response.render('staff_admin/management', {
            pageTitle: 'TravelAloha - StaffManagement',
            user: request.user,
            canCreate: 'true',
            canRead: 'true',
            canUpdate: 'true',
            canDelete: 'true',
            data: JSON.stringify([[]])
        })
    } catch (error) {
        response.send(`
            <!DOCTYPE html><head><title>Oops</title></head>
            <body><p>Something was wrong !! ${error} </p></body>
        `)
    }
}
