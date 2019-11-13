var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('Contact_System/landingPage', {
    pageTitle: 'TravelAloha-ContactSystem',
    user: req.user
  });
});

router.get('/informationFlow', function (req, res, next) {
  res.render('Contact_System/informationFlow', {
    pageTitle: 'TravelAloha-Information',
    user: req.user
  });
});

router.get('/newAirlineInfo', function (req, res, next) {
  res.render('Contact_System/newAirlineInfo', {
    pageTitle: 'TravelAloha-NewAirline',
    user: req.user
  });
});

router.get('/newHotelInfo', function (req, res, next) {
  res.render('Contact_System/newHotelInfo', {
    pageTitle: 'TravelAloha-NewHotel',
    user: req.user
  });
});

router.get('/hotelDetail', function (req, res, next) {
  res.render('Contact_System/hotelDetail', {
    pageTitle: 'TravelAloha-Detail',
    user: req.user
  });
});

module.exports = router;