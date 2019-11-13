const connector = require("../db/db")

exports.getUsersPage = function(req, res){
    let query = "SELECT * FROM user ORDER BY user_id ASC"; 
    
    // execute query
    connector.query(query, (err, result) => {
        // if (err) {
        //     res.redirect('/');
        // }
        res.render('userManagement/users.ejs', {
            pageTitle: "Users Management"
            ,user: result
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
    res.render('userManagement/edit-users.ejs', {
        pageTitle: " Edit a user"
        ,message: ''
    });
}

exports.detailUsersPage = function(req,res) {
    res.render('userManagement/detail-users.ejs', {
        pageTitle: " Detail of a user"
        ,message: ''
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