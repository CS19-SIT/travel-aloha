const db = require("../db/db");

exports.findCoupons = async ({
    code,
    name,
    description,
    levels,
    page,
    entriesPerPage = 10
}) => {

};

exports.findCoupon = async code => {
    return exports.findCoupons({code: code}).then(coupons => coupons[0]);
};

exports.generateCouponCode = async () => {

};

exports.createCoupon = async ({
    code,
    name,
    description,
    levels,
    hotels,
    airlines,
    discountPercentage,
    startDate,
    endDate
}) => {

};

exports.editCoupon = async ({
    code,
    name,
    description,
    levels,
    hotels,
    airlines,
    discountPercentage,
    startDate,
    endDate
}) => {

};

exports.deleteCoupon = async code => {

};
