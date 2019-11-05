const connector = require("../db/db")

exports.getApplicationForm = async function(request, response) {
    try {
        var result = await connector.query(`SELECT * FROM user`)
        response.render('staff_admin/recruiting', {
            pageTitle: 'TravelAloha - StaffRecruiting',
            user: request.user,
            data: JSON.stringify(result[0])
        })
    } catch (error) {
        response.send(`
        <!DOCTYPE html><head><title></title></head>
        <body><h1>Something was wrong</h1></body>
        `)
    }
}

exports.getApplicationForm2 = async (request, response) => {
    try {
        var result = await connector.query(`SELECT * FROM user WHERE username='${request.params.userId}'`)
        response.render('staff_admin/recruiting', {
            pageTitle: 'TravelAloha - StaffRecruiting',
            user: request.user,
            data: JSON.stringify(result[0])
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

exports.getAllExistedStaffDetail = function(request, response) {
    response.render('staff_admin/management', {
        pageTitle: 'TravelAloha - StaffManagement',
        user: request.user,
    })
}