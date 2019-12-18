const db = require("../../db/db");
const adminUser = require("../../models/user");
const User = require("../../models/admin-user");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.getUsersPage = async (req, res) => {
    try {
      let data = await User.getAllUser();
      let myRole = await db.query('SELECT role FROM user WHERE user_id=\''+ req.user.user_id+'\'');
      res.render("userManagement/users", {
        pageTitle: "User Management",
        user: req.user,
        data: data,
        isAdmin: (myRole[0][0].role == 'Admin')
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

exports.editUsersPage = async function(req, res) {
    const myRole = await db.query('SELECT role FROM user WHERE user_id=\''+ req.user.user_id+'\'');
    if (myRole[0][0].role != 'Admin') {
        return res.redirect('/');
    }
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
  db.query(query, async (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      if (result.changedRows != 0) {
          let userEmail = await db.query("SELECT `email` FROM `user` WHERE `user`.`user_id`='" + user_id +"'");
          userEmail = userEmail[0][0].email;
          var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
              user: 'travelaloha55@gmail.com',
              pass: 'fk9hkg[l'
            }
          }));
          const mailOptions = {
            from: 'travelaloha55@gmail.com', // sender address
            to: userEmail, // list of receivers
            subject: 'Travelaloha Official', // Subject line
            text: 'Your info has been changed'// plain text body
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
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
