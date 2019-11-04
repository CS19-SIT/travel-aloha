const connector = require("../db/db")

exports.getApplicationForm = async function(request, response) {
    try {
        response.render('staff_admin/recruiting', {
            pageTitle: 'TravelAloha - StaffRecruiting',
            user: request.user,
            data: await connector.query(`SELECT * FROM user`)
        })
    } catch (error) {
        response.send(`
        <!DOCTYPE html><head><title></title></head>
        <body><h1>Something was wrong</h1></body>
        `)
    }
}

exports.getStaffCandidatesList = function(request, response) {
    response.render('staff_admin/requisition', {
        pageTitle: 'TravelAloha - StaffRequisition',
        user: request.user,
    })
}

exports.getAllStaffDetail = function(request, response) {
    response.render('staff_admin/management', {
        pageTitle: 'TravelAloha - StaffManagement',
        user: request.user,
    })
}