const moment = require("moment");
const User = require("../../models/user");
const Rating_ReviewModel = require("../../models/Rating_Review");

exports.getHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { Type_Of_Hotel_Reviewer, Sort, Score} = req.query;
    const hotelReview = await Rating_ReviewModel.getHotelReviewInfo(id, Type_Of_Hotel_Reviewer, Sort, Score);

    // console.log(Type_Of_Hotel_Reviewer, Sort, Score);
    // console.log(req.query);
    if (hotelReview[0].length == 0) {
      return res.status(404).render("errors/404", {
        pageTitle: "TravelAloha - Page Not Found",
        user: req.user
      });
    }
    res.render("review_rating/ReviewHotel", {
      pageTitle: "TravelAloha - Review - Hotel",
      user: req.user,
      hotelId: id,
      hotelReview: hotelReview[0],
      findProfileById: User.findProfileById,
      moment
    });
  } catch (getHotelError) {
    // console.log(getHotelError);
    res.status(500).render("errors/500", {
      pageTitle: "TravelAloha - Bad Request",
      user: req.user,
      error: getHotelError
    });
  }
};

// exports.getFlight = (req, res) =>
//   res.render("review_rating/ReviewAirline", {
//     pageTitle: "TravelAloha - Review - Airline",
//     user: req.user
//   });

exports.getAirline = async (req, res) => {
    try {
      const { id } = req.params;
      const airlineReview = await Rating_ReviewModel.getAirlineReviewInfo(id);
      if (airlineReview[0].length == 0) {
        return res.status(404).render("errors/404", {
          pageTitle: "TravelAloha - Page Not Found",
          user: req.user
        });
      }
      res.render("review_rating/ReviewAirline", {
        pageTitle: "TravelAloha - Review - Airline",
        user: req.user,
        airlineId: id,
        airlineReview: airlineReview[0],
        findProfileById: User.findProfileById,
        moment
      });
    } catch (getAirlineError) {
      res.status(500).render("errors/500", {
        pageTitle: "TravelAloha - Bad Request",
        user: req.user,
        error: getAirlineError
      });
    }
  };

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
    Service_Hotel_Rating
  } = req.body;
  const hotel_hotelId = req.params.id;
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
    res.redirect(204, "/review/hotel/:id");
  } catch (error) {
    res.sendStatus(500);
    throw new Error(`[ERR] insertNewHotel: ${error}`);
  }
};

exports.postAirlineReview = async (req, res) => {
  const {
    userId,
    Title_Airline,
    Text_Airline_Review,
    CabinCrewRating_Airline_Rating,
    Comfort_Airline_Rating,
    Meal_Airline_Rating,
    Entertainment_Airline_Rating,
    Type_Of_Airline_Reviewer,
  } = req.body;
  const airlineId_fk = req.params.id;
  try {
    await Rating_ReviewModel.insertNewAirline({
      userId,
      Title_Airline,
      Text_Airline_Review,
      CabinCrewRating_Airline_Rating,
      Comfort_Airline_Rating,
      Meal_Airline_Rating,
      Entertainment_Airline_Rating,
      Type_Of_Airline_Reviewer,
      airlineId_fk
    });
    res.redirect(204, "/review/airline/:id");
  } catch (error) {
    res.sendStatus(404);
    throw new Error(`[ERR] insertNewAirline: ${error}`);
  }
};