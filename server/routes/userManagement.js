const express = require("express");
const router = express.Router();

const userManagementController = require('../controllers/userManagement');

router.get('/userManagement', userManagementController.getUsersPage);
router.get('/add', userManagementController.addUsersPage);
router.get('/edit/:id',userManagementController.editUsersPage);
router.get('/detail/:id', userManagementController.detailUsersPage);
router.get('/delete/:id', userManagementController.deleteUsers);
// router.post('/add', userManagementController.addUsers);
// router.post('/edit/:id', userManagementController.editUsers);
// router.post('/detail/:id', userManagementController.detailUsers);

module.exports = router;
