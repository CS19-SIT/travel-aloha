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

exports.editUsers = function (req, res) {  
  let user_id = req.params.user_id;
  let level = req.body.Level;
  let role = req.body.Role;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.Email || null;
  let username = req.body.username;

  let query = "UPDATE `user` SET `Level` = '" + level + "',`Role` = '" + role + "',`firstname` = '" + firstname + "', `lastname` = '" + lastname + "', `Email` = '" + email + "', `username` = '" + username + "' WHERE `user`.`user_id` = '" + user_id +"'";
  db.query(query, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.redirect('../');
  });
},

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

exports.deleteUsers = function(req,res) {
    let user_id = req.params.user_id;

    let deleteUserQuery = 'DELETE FROM user WHERE user_id = "' + user_id + '"';

    db.query(deleteUserQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('../');
    });
}

exports.putUser = async (req, res) => {
    try {
      await User.modelUpdateUser(req.body.user_id);
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
}
