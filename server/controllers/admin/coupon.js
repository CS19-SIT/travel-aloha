const Coupon = require("../../models/coupon");

exports.getIndex = async (req, res) => {
  try {
    //  let data = await Hotel.getAllHotel();

    res.render("admin/admin-coupon", {
      pageTitle: "TravelAloha - Admin - Coupon Management",
      user: req.user
      //   hotel: data
    });
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.createCoupon = async (req, res) => {
  try {
    await Coupon.createCoupon(req.body);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.editCoupon = async (req, res) => {
  try {
    await Coupon.editCoupon(req.body);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    await Coupon.deleteCoupon(req.body.code);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.findCoupon = async (req, res) => {
  try {
    res.send(await Coupon.findCoupon(req.params.code));
  } catch (err) {
    res.sendStatus(404);
  }
};
