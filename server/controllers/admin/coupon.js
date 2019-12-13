const querystring = require('querystring');
const Coupon = require("../../models/coupon");
const CouponAdmin = require("../../models/admin-coupon");

const allLevels = [
  ["silver", "Silver"],
  ["gold", "Gold"],
  ["elite", "Elite"],
  ["normal", "Normal"],
];

const defaultLevels = allLevels.map(e => e[0].toString());
const defaultOption = "1"; // "Code"

const formRequestDataToModelData = (req) => {
  return {
    ...req.body,
    create_by_user_id: req.user.user_id,
    creation_date: new Date(Date.now()),
    for_every_hotel: req.body.for_every_hotel === "on",
    for_every_airline: req.body.for_every_airline === "on",
    levels: Array.isArray(req.body.levels) ? req.body.levels :
      (req.body.levels == null ? null : [req.body.levels]),
    hotels: Array.isArray(req.body.hotels) ? req.body.hotels :
      (req.body.hotels == null ? null : [req.body.hotels]),
    airlines: Array.isArray(req.body.airlines) ? req.body.airlines :
      (req.body.airlines == null ? null : [req.body.airlines]),
    users: Array.isArray(req.body.users) ? req.body.users :
      (req.body.users == null ? null : [req.body.users]),
  };
}

exports.getIndex = async (req, res, next) => {
  try {
    const page = parseInt(req.params.page) || 0;
    let searchParam;
    let query;
    let queryString = "";

    if (req.query.search === "true") {
      query = {
        ...req.query,
        opt: req.query.opt || defaultOption,
        levels: Array.isArray(req.query.levels) ? req.query.levels : [req.query.levels]
      };

      searchParam = {
        code: query.opt === "1" ? query.q : null,
        name: query.opt === "2" ? query.q : null,
        description: query.opt === "3" ? query.q : null,
        levels: query.levels,
        page
      };

      queryString = "?" + querystring.stringify(query);
    } else {
      query = {
        opt: "1",
        levels: defaultLevels
      };

      searchParam = {
        page
      };
    }

    let coupons = await Coupon.searchCoupons(searchParam);

    res.render("admin/admin-coupon", {
      pageTitle: "TravelAloha - Admin - Coupon Management",
      user: req.user,
      page,
      allLevels,
      coupons: coupons.coupons,
      pageCount: coupons.pageCount || 1,
      query,
      queryString
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    next();
  }
};

exports.createCoupon = async (req, res) => {
  try {
    await Coupon.createCoupon(formRequestDataToModelData(req));
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.editCoupon = async (req, res) => {
  try {
    await Coupon.editCoupon(req.params.code, formRequestDataToModelData(req));
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

exports.getCoupon = async (req, res) => {
  try {
    res.send(await Coupon.getCoupon(req.params.code));
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.searchHotelFormOptions = async (req, res) => {
  try {
    res.send(await CouponAdmin.searchHotelFormOptions(req.query.search, req.query.page))
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.searchAirlineFormOptions = async (req, res) => {
  try {
    res.send(await CouponAdmin.searchAirlineFormOptions(req.query.search, req.query.page))
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.searchUser = async (req, res) => {
  try {
    res.send(await CouponAdmin.searchUser(req.query.search, req.query.page))
  } catch (err) {
    res.sendStatus(500);
  }
};
