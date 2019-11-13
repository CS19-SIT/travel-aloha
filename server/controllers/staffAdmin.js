const connector = require("../db/db")

exports.getApplicationForm = async function(request, response) {
    try {
        let staffStatus = await connector.query(`SELECT * FROM staff_admin_info WHERE staffId='${request.user.user_id}'`)
        let isStaff = 'false'
        if (staffStatus[0] && staffStatus[0].length) {
            if (staffStatus[0][0]['status'] == 'active') {
                isStaff = 'true'
            }
        }
        if (isStaff == 'true') {
            response.redirect('/staff_admin/management')
        }
        let matchedInfo = await connector.query(`SELECT user_id, birth_date, profile_picture, username, CONCAT(firstname, ' ', lastname) AS name, gender, address FROM user WHERE user_id='${request.user.user_id}'`)
        response.render('staff_admin/recruiting', {
            pageTitle: 'TravelAloha - StaffRecruiting',
            user: request.user,
            onPending: (staffStatus[0] && staffStatus[0].length && staffStatus[0][0]['status'] == 'pending')?'true':'false',
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
    response.render('staff_admin/management', {
        pageTitle: 'TravelAloha - StaffManagement',
        user: request.user,
    })
}

exports.getIndexPage = function(request, response) {
    response.render('staff_admin/index', {
        pageTitle: 'TravelAloha - StaffManagement',
        user: request.user,
    })
}