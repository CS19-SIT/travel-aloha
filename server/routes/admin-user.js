const express = require("express");
const router = express.Router();

const adminUserController = require("../controllers/admin-user");

router.get("/", adminUserController.getUsersPage);
router.get("/add", adminUserController.addUsersPage);
router.get("/edit/:id", adminUserController.editUsersPage);
router.get("/detail/:id", adminUserController.detailUsersPage);
router.get("/delete/:id", adminUserController.deleteUsers);
// router.post('/add', userManagementController.addUsers);
// router.post('/edit/:id', userManagementController.editUsers);
// router.post('/detail/:id', userManagementController.detailUsers);

module.exports = router;
