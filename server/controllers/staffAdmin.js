const connector = require("../db/db")

exports.getApplicationForm = async function(request, response) {
    try {
        var result = await connector.query(`SELECT * FROM user WHERE user_id='${request.user.user_id}'`)
        response.render('staff_admin/recruiting', {
            pageTitle: 'TravelAloha - StaffRecruiting',
            user: request.user,
            data: JSON.stringify(result[0])
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