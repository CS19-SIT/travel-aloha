const db = require("../db/db");

exports.getUsersPage = function(req, res) {
  let query = "SELECT * FROM `user` ORDER BY user_id ASC";
  db.query(query, function(err, result) {
    res.render("userManagement/users", {
      user: result,
      pageTitle: "TravelAloha - Usermanagement"
    });
  });
};

exports.addUsersPage = function(req, res) {
  res.render("userManagement/add-users.ejs", {
    title: " Add a new user",
    message: ""
  });
};

exports.editUsersPage = function(req, res) {
  let user_id = req.params.id;
  let query = "SELECT * FROM `users` WHERE user_id = '" + user_id + "' ";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.render("userManagement/edit-users.ejs", {
      title: "Edit  User",
      users: result[0],
      message: ""
    });
  });
};

exports.detailUsersPage = function(req, res) {
  let user_id = req.params.id;
  let query = "SELECT * FROM `users` WHERE user_id = '" + user_id + "' ";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.render("userManagement/detail-users.ejs", {
      title: "",
      users: result[0],
      message: ""
    });
  });
};

exports.deleteUsers = function(req, res) {
  let user_id = req.params.id;
  let getImageQuery =
    'SELECT profile_picture from `users` WHERE user_id = "' + user_id + '"';
  let deleteUserQuery = 'DELETE FROM users WHERE user_id = "' + user_id + '"';

  db.query(getImageQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    let image = result[0].profile_picture;

    fs.unlink(`server/uploads/${image}`, err => {
      if (err) {
        return res.status(500).send(err);
      }
      db.query(deleteUserQuery, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.redirect("/users");
      });
    });
  });
};

exports.addUsers = function(req, res) {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  let message = "";
  let username = req.body.username;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let gender = req.body.gender;
  let birth_date = req.body.birth_date;
  let phoneNumber = req.body.phoneNumber;
  let userRole = req.body.userRole;
  let email = req.body.email;

  let uploadedFile = req.files.profile_picture;
  let image_name = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split("/")[1];
  image_name = username + "." + fileExtension;

  let usernameQuery =
    "SELECT * FROM `users` WHERE username = '" + username + "'";

  db.query(usernameQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length > 0) {
      message = "Username already exists";
      res.render("userManagement/add-users.ejs", {
        message,
        title: " Add a new User"
      });
    } else {
      if (
        uploadedFile.mimetype === "image/png" ||
        uploadedFile.mimetype === "image/jpeg" ||
        uploadedFile.mimetype === "image/gif"
      ) {
        uploadedFile.mv(`server/uploads/${image_name}`, err => {
          if (err) {
            return res.status(500).send(err);
          }

          let query =
            "INSERT INTO `users` (firstname, lastname, gender, birth_date, phoneNumber, userRole, email, profile_picture, username) VALUES ('" +
            firstname +
            "', '" +
            lastname +
            "', '" +
            gender +
            "', '" +
            birth_date +
            "', '" +
            phoneNumber +
            "', '" +
            userRole +
            "', '" +
            email +
            "', '" +
            image_name +
            "', '" +
            username +
            "')";
          db.query(query, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.redirect("/users");
          });
        });
      } else {
        message =
          "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
        res.render("userManagement/add-users.ejs", {
          message,
          title: " Add a new users"
        });
      }
    }
  });
};

exports.editUsers = function(req, res) {
  let user_id = req.params.id;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let gender = req.body.gender;
  let phoneNumber = req.body.phoneNumber;
  let email = req.body.email;
  let query =
    "UPDATE `users` SET `firstname` = '" +
    firstname +
    "', `lastname` = '" +
    lastname +
    "', `gender` = '" +
    gender +
    "', `phoneNumber` = '" +
    phoneNumber +
    "', `email` = '" +
    email +
    "' WHERE `users`.`user_id` = '" +
    user_id +
    "'";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect("/users");
  });
};
