const express = require("express");
const router = express.Router();

const adminUserController = require("../../controllers/admin/user");
const authMiddleware = require("../../middlewares/auth");

router.get(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminUserController.getUsersPage
);
router.get(
  "/add",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminUserController.addUsersPage
);
router.get(
  "/edit/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminUserController.editUsersPage
);
router.get(
  "/detail/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminUserController.detailUsersPage
);
router.get(
  "/delete/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminUserController.deleteUsers
);
// router.post('/add', userManagementController.addUsers);
// router.post('/edit/:id', userManagementController.editUsers);
// router.post('/detail/:id', userManagementController.detailUsers);

module.exports = router;
