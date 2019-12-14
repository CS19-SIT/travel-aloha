
const Rating_ReviewModel = require("../../models/Rating_Review");

exports.getHotel = (req, res) => {
  res.render("review_rating/ReviewHotel", {
    pageTitle: "TravelAloha - Review - Hotel",
    user: req.user,
    hotelId: req.params.id
  });
}

exports.getFlight = (req, res) =>
  res.render("review_rating/ReviewAirline", {
    pageTitle: "TravelAloha - Review - Airline",
    user: req.user
  });

exports.getAirline = (req, res) =>
  res.render("review_rating/SearchAirline", {
    pageTitle: "TravelAloha - Find Airline",
    user: req.user
  });

exports.postHotelReview = async (req, res) => {
  const {
    userId,
    Title_Hotel,
    Type_Of_Hotel_Reviewer,
    Text_Hotel_Review,
    Cleanliness_Hotel_Rating,
    Comfort_Hotel_Rating,
    Meal_Hotel_Rating,
    Location_Hotel_Rating,
    Service_Hotel_Rating,
  } = req.body;
  const hotel_hotelId = req.params.id
  try {
    await Rating_ReviewModel.insertNewHotel_Review({
      userId,
      Title_Hotel,
      Type_Of_Hotel_Reviewer,
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
    res.redirect(204, "/review/hotel");
  } catch (error) {
    res.sendStatus(500);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};

exports.postFlightReview = async (req, res) => {
  const {
    Title_Flight,
    Type_Of_Flight_Reviewer,
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
      Type_Of_Flight_Reviewer,
      Text_Flight_Review,
      CabinCrewRating_Flight_Rating,
      Comfort_Flight_Rating,
      Meal_Flight_Rating,
      Entertainment_Flight_Rating,
      Flight_Flight_number
    });
    res.redirect(204, "/review/airline");
  } catch (error) {
    res.sendStatus(404);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};

