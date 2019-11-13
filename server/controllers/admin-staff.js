const db = require("../db/db");

exports.getIndex = function(request, response) {
  response.render("staff_admin/index", {
    pageTitle: "TravelAloha - Admin - Staff Management",
    user: request.user
  });
};

exports.getApplicationForm = async function(request, response) {
  try {
    var result = await db.query(
      `SELECT * FROM user WHERE user_id='${request.user.user_id}'`
    );
    response.render("staff_admin/recruiting", {
      pageTitle: "TravelAloha - Admin - StaffRecruiting",
      user: request.user,
      data: JSON.stringify(result[0])
    });
  } catch (error) {
    response.send(`
            <!DOCTYPE html><head><title>Oops</title></head>
            <body><p>Something was wrong !! ${error} </p></body>
        `);
  }
};

exports.getStaffCandidatesList = function(request, response) {
  response.render("staff_admin/requisition", {
    pageTitle: "TravelAloha - Admin - StaffRequisition",
    user: request.user
  });
};

exports.getDetailAllExistedStaff = function(request, response) {
  response.render("staff_admin/management", {
    pageTitle: "TravelAloha - Admin - StaffManagement",
    user: request.user
  });
};
