const express = require("express");
const router = express.Router();

const userManagementController = require('../controllers/userManagement');

router.get('/', userManagementController.getUsersPage);
router.get('/add', userManagementController.addUsersPage);
router.get('/edit',userManagementController.editUsersPage);
router.get('/detail', userManagementController.detailUsersPage);
router.get('/delete', userManagementController.deleteUsers);
// router.post('/add', userManagementController.addUsers);
// router.post('/edit/:id', userManagementController.editUsers);
// router.post('/detail/:id', userManagementController.detailUsers);

module.exports = router;
