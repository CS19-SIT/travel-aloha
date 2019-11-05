var express = require('express');
var router = express.Router();

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('Contact_System/landingPage', {
      pageTitle: 'TravelAloha-sdasdas',
      user: req.user,
      page:'LandingPage', 
      menuId:'landingPage'});
  });

router.get('/hotelDetail', function(req, res, next) {
  res.render('Contact_System/hotelDetail', {
    pageTitle: 'TravelAloha-sdasdas',
    user: req.user,
    page:'Hotel Detail', 
    menuId:'hotelDetail'
  });
});

/* GET home page. */
router.get('/informationFlow', function(req, res, next) {
    res.render('Contact_System/informationFlow', {
      pageTitle: 'TravelAloha-sdasdas',
      user: req.user,
      page:'Information', 
      menuId:'informationFlow'
    });
  });

/* GET home page. */
router.get('/newAirlineInfo', function(req, res, next) {
    res.render('Contact_System/newAirlineInfo', {
      pageTitle: 'TravelAloha-sdasdas',
      user: req.user,
      page:'New Airline',  
      menuId:'newAirlineInfo'
    });
  });

  /* GET home page. */
router.get('/newHotelInfo', function(req, res, next) {
    res.render('Contact_System/newHotelInfo', {
      pageTitle: 'TravelAloha-sdasdas',
      user: req.user,
      page:'New Hotel', 
      menuId:'newHotelInfo'
    });
  });

  module.exports = router;