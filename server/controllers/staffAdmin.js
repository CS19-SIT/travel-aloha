const connector = require("../db/db")

exports.getApplicationForm = async function(request, response) {
    try {
        // console.log(request.user);
        var result = await connector.query(`SELECT * FROM user WHERE user_id='${request.user.user_id}'`)
        response.render('staff_admin/recruiting', {
            pageTitle: 'TravelAloha - StaffRecruiting',
            user: request.user,
            data: JSON.stringify(result[0])
        })
    } catch (error) {
        response.redirect('/login')
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