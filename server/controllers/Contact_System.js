exports.getContactSystem = (req, res) =>
    res.render('Contact_System/landingPage', {
        pageTitle: 'TravelAloha-ContactSystem',
        user: req.user
    });

exports.getInformation = (req, res) =>
    res.render('Contact_System/informationFlow', {
        pageTitle: 'TravelAloha-Information',
        user: req.user
    });


exports.getAirlineInfo = (req, res) =>
    res.render('Contact_System/newAirlineInfo', {
        pageTitle: 'TravelAloha-NewAirline',
        user: req.user
    });

exports.getHotelInfo = (req, res) =>
    res.render('Contact_System/newHotelInfo', {
        pageTitle: 'TravelAloha-NewHotel',
        user: req.user
    });

exports.getHotelDetail = (req, res) =>
    res.render('Contact_System/hotelDetail', {
        pageTitle: 'TravelAloha-Detail',
        user: req.user
    });
