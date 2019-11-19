const Rating_Review = require("../../models/Rating_Review");

exports.getHotel = (req, res) =>
  res.render("review_rating/hotel", {
    pageTitle: "TravelAloha - Review - Hotel",
    user: req.user
  });

exports.getFlight = (req, res) =>
  res.render("review_rating/airline", {
    pageTitle: "TravelAloha - Review - Airline",
    user: req.user
  });

exports.postHotelReview = async (req, res) => {
  const {
    Title_Hotel,
    Text_Hotel_Review,
    Cleanliness_Hotel_Rating,
    Comfort_Hotel_Rating,
    Meal_Hotel_Rating,
    Location_Hotel_Rating,
    Service_Hotel_Rating,
    hotel_hotelId
  } = req.body;
  try {
    await contactModel.insertNewHotel({
      Title_Hotel,
      Text_Hotel_Review,
      Cleanliness_Hotel_Rating,
      Comfort_Hotel_Rating,
      Meal_Hotel_Rating,
      Location_Hotel_Rating,
      Service_Hotel_Rating,
      hotel_hotelId
    });
    // ** Wait for learning upload file
    // await contactModel.insertNewHotelFile({
    //   hotelPicture
    // })
    res.redirect("review_rating/hotel");
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};

exports.postFlightInfo = async (req, res) => {
  const {
    Title_Flight,
    Text_Flight_Review,
    CabinCrewRating_Flight_Rating,
    Comfort_Flight_Rating,
    Meal_Flight_Rating,
    Entertainment_Flight_Rating,
    Flight_Flight_number
  } = req.body;

  try {
    await contactModel.insertNewFlight({
      Title_Flight,
      Text_Flight_Review,
      CabinCrewRating_Flight_Rating,
      Comfort_Flight_Rating,
      Meal_Flight_Rating,
      Entertainment_Flight_Rating,
      Flight_Flight_number
    });
    res.redirect("review_rating/airline");
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};
