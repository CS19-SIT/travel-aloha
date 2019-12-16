var express = require("express");
var router = express.Router();

const contactController = require("../../controllers/contact/index");
const authMiddleware = require("../../middlewares/auth");

router.get("/", contactController.getIndex);
router.get("/add-new-hotel", contactController.getHotelInfo);
router.post("/add-new-hotel", contactController.postHotelInfo);
router.get("/add-new-airline", contactController.getAirlineInfo);
router.post("/add-new-airline", contactController.postAirlineInfo);
router.get(
  "/new-hotel-dashboard",
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff,
  contactController.getHotelDashboard
);
router.get(
  "/new-airline-dashboard",
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff,
  contactController.getAirlineDashboard
);
router.post(
  "/new-hotel-dashboard/detail/new-hotel",
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff,
  contactController.getHotelDetail
);
router.post(
  "/new-airline-dashboard/detail/new-airline",
  authMiddleware.isAuthenticated,
  authMiddleware.isStaff,
  contactController.getAirlineDetail
);

// router.get(
//   "/test",
//   async (req, res) => {
//     res.render('contact/test', {
//       pageTitle: "Test bros",
//       user: req.user,
//     })
//   }
// )
// router.post(
//   "/ajax",
//   async (req, res) => {
//     try {
//       console.log(JSON.parse(req.body.prices));
//       console.log(JSON.parse(req.body.www))
      
//       res.json({
//         data: 'OK',
//         status: 200
//       });
//     } catch (err) {
//       res.json({
//         status: 200
//       });
//     }
//   }
// )
module.exports = router;
