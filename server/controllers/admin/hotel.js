const moment = require("moment");

const Hotel = require("../../models/hotel");

exports.getIndex = async (req, res) => {
  const hotels = await Hotel.findAll();
  res.render("admin/admin-hotel", {
    pageTitle: "Travel Aloha - Admin - Hotel Management",
    user: req.user,
    hotels
  });
};

exports.getNew = async (req, res) => {
  res.render("admin/edit-hotel", {
    pageTitle: "Travel Aloha - Admin - Hotel Management - Add New Hotel",
    user: req.user,
    hotelData: undefined
  });
};

exports.getEdit = async (req, res) => {
  const { hotelId } = req.params;
  const hotelData = await Hotel.findById(hotelId);

  res.render("admin/edit-hotel", {
    pageTitle:
      "Travel Aloha - Admin - Hotel Management - Edit Hotel " + hotelId,
    user: req.user,
    hotelData
  });
};

exports.postIndex = async (req, res) => {
  const {
    hotelName,
    hotelDescription,
    hotelAddress,
    hotelTelNumber,
    hotelContactNumber,
    hotelEmail,
    hotelPicture,
    hotelLogo
  } = req.body;

  try {
    await Hotel.create(
      hotelName,
      hotelDescription,
      hotelAddress,
      hotelTelNumber,
      hotelContactNumber,
      hotelEmail,
      hotelPicture,
      hotelLogo
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.putIndex = async (req, res) => {
  let hotelVerify = req.body.hotelVerify ? true : false;

  const { hotelId } = req.params;
  const {
    hotelName,
    hotelDescription,
    hotelAddress,
    hotelTelNumber,
    hotelContactNumber,
    hotelEmail,
    hotelPicture,
    hotelLogo
  } = req.body;

  if (!hotelId) return res.sendStatus(400);

  try {
    await Hotel.updateById(
      hotelId,
      hotelName,
      hotelDescription,
      hotelAddress,
      hotelTelNumber,
      hotelContactNumber,
      hotelEmail,
      hotelPicture,
      hotelLogo,
      hotelVerify
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.deleteIndex = async (req, res) => {
  const { hotelId } = req.params;
  if (!hotelId) return res.sendStatus(400);

  try {
    await Hotel.deleteById(hotelId);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};
