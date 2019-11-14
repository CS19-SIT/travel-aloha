const db = require("../db/db");
const User = require("../models/user");

exports.getUsersPage = function(req, res){
    let query = "SELECT * FROM user";
    db.query(query,function(err,result){
        res.render('userManagement/users',{
            data:result,
            user : req.user,
            pageTitle: 'TravelAloha'
        });
    });
}

exports.addUsersPage = function(req,res) {
    res.render('userManagement/add-users.ejs', {
        pageTitle: " Add a new user"
        ,message: ''
    });
}

exports.editUsersPage = function(req,res) {
    let user_id = req.params.user_id;
    // let query = "SELECT * FROM user WHERE user_id = '" + user_id + "' ";
    db.query(user_id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('userManagement/edit-users.ejs', {
            data:result[0],
            user : req.user,
            pageTitle: 'TravelAloha'
        });
    });
    // res.render('userManagement/edit-users.ejs', {
    //     pageTitle: " Edit a user"
    //     ,message: ''
    // });
}

exports.detailUsersPage = function(req,res) {
    let user_id = req.params.user_id;
    let query = "SELECT * FROM user WHERE user_id = '" + user_id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('userManagement/detail-users.ejs', {
            data: result,
            user: req.user,
            pageTitle: 'TravelAloha'
        });
    });
}

exports.deleteUsers = function(req,res) {
    let user_id = req.params.id;
    let getImageQuery = 'SELECT profile_picture from `user` WHERE user_id = "' + user_id + '"';
    let deleteUserQuery = 'DELETE FROM user WHERE user_id = "' + user_id + '"';

    db.query(getImageQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let image = result[0].profile_picture;

        fs.unlink(`server/uploads/${image}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    });
}