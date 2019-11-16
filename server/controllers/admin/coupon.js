const querystring = require('querystring');
const Coupon = require("../../models/coupon");

const allLevels = [
  [1, "Silver"],
  [2, "Gold"],
  [3, "Platinum"],
  [4, "Diamond"],
];

const defaultLevels = allLevels.map(e => e[0].toString());
const defaultTypes = ["flight", "hotel"];
const defaultOption = "1"; // "Code"

exports.getIndex = async (req, res, next) => {
  try {
    const query = {
      ...req.query,
      opt: req.query.opt || defaultOption,
      // Not a fan of this, but whatever.
      levels: Array.isArray(req.query.levels) ? req.query.levels :
        (req.query.level == null ? defaultLevels : [req.query.levels]),
      types: Array.isArray(req.query.types) ? req.query.types :
        (req.query.types == null ? defaultTypes : [req.query.types])
    }
    const page = req.params.page || 0;
    
    let coupons = await Coupon.searchCoupons({
      code: query.opt === "1" ? query.q : null,
      name: query.opt === "2" ? query.q : null,
      description: query.opt === "3" ? query.q : null,
      levels: query.levels,
      page
    });

    res.render("admin/admin-coupon", {
      pageTitle: "TravelAloha - Admin - Coupon Management",
      user: req.user,
      page: page,
      allLevels,
      ...coupons,
      query,
      queryString: querystring.stringify(query)
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    next();
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
    res.send(await Coupon.deleteCoupon(req.params.code));
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
