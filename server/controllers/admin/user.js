const db = require("../../db/db");
const adminUser = require("../../models/user");
const User = require("../../models/admin-user");

exports.getUsersPage = async (req, res) => {
    try {
      let data = await User.getAllUser();
  
      res.render("userManagement/users", {
        pageTitle: "User Management",
        user: req.user,
        data: data
      });
    } catch (err) {
      res.sendStatus(404);
    }
}

exports.addUsersPage = function(req,res) {
    res.render('userManagement/add-users.ejs', {
        pageTitle: " Add a new user"
        ,message: ''
    });
}

exports.editUsersPage = function(req, res) {
    let user_id = req.params.user_id;
    let query = "SELECT * FROM user WHERE user_id = '" + user_id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('userManagement/edit-users.ejs', {
            pageTitle: "Edit User",
            user: req.user,
            data: result[0]
        });
    });
}

exports.detailUsersPage = function(req,res) {
    let user_id = req.params.user_id;
    let query = "SELECT * FROM user WHERE user_id = '" + user_id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('userManagement/detail-users.ejs', {
            pageTitle: "User detail",
            user: req.user,
            data: result[0]
        });
    });
}

// exports.deleteUsers = function(req,res) {
//     let user_id = req.params.user_id;
//     let getImageQuery = 'SELECT profile_picture from `user` WHERE user_id = "' + user_id + '"';
//     let deleteUserQuery = 'DELETE FROM user WHERE user_id = "' + user_id + '"';

//     db.query(deleteUserQuery, (err, result) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.redirect('userManagement/users');
//     });
// }

exports.putUser = async (req, res) => {
    try {
      await User.modelUpdateUser(req.body.user_id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
}

exports.deleteUsers = async (req, res) => {
    try {
      await User.deleteUser(req.body.user_id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
  };