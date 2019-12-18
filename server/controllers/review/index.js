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
    // if (hotelReview[0].length == 0) {
    //   return res.status(404).render("errors/404", {
    //     pageTitle: "TravelAloha - Page Not Found",
    //     user: req.user
    //   });
    // }
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
      const { Type_Of_Airline_Reviewer, Sort, Score} = req.query;
      const airlineReview = await Rating_ReviewModel.getAirlineReviewInfo(id, Type_Of_Airline_Reviewer, Sort, Score);
      // if (airlineReview[0].length == 0) {
      //   return res.status(404).render("errors/404", {
      //     pageTitle: "TravelAloha - Page Not Found",
      //     user: req.user
      //   });
      // }
      console.log(req.query);
      res.render("review_rating/ReviewAirline", {
        pageTitle: "TravelAloha - Review - Airline",
        user: req.user,
        airlineId: id,
        airlineReview: airlineReview[0],
        findProfileById: User.findProfileById,
        moment
      });
    } catch (getAirlineError) {
          // console.log(getAirlineError);
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
    console.log(req.body);
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
    Type_Of_Airline_Reviewer,
    Text_Airline_Review,
    CabinCrewRating_Airline_Rating,
    Comfort_Airline_Rating,
    Meal_Airline_Rating,
    Entertainment_Airline_Rating,
  } = req.body;
  console.log(req.body);
  const airlineId_fk = req.params.id;
  try {
    await Rating_ReviewModel.insertNewAirline_Review({
      userId,
      Title_Airline,
      Type_Of_Airline_Reviewer,
      Text_Airline_Review,
      CabinCrewRating_Airline_Rating,
      Comfort_Airline_Rating,
      Meal_Airline_Rating,
      Entertainment_Airline_Rating,
      airlineId_fk
    });
    console.log(req.body);
    res.redirect(204, "/review/airline/:id");
  } catch (error) {
    res.sendStatus(500);
    throw new Error(`[ERR] insertNewAirline: ${error}`);
  }
};

exports.editHotelReview  = async (req, res) => {
  const {
    idHotel_Review,
    Title_Hotel,
    Type_Of_Hotel_Reviewer,
    Text_Hotel_Review,
    Cleanliness_Hotel_Rating,
    Comfort_Hotel_Rating,
    Meal_Hotel_Rating,
    Location_Hotel_Rating,
    Service_Hotel_Rating
  } = req.body;
  try {
    await Rating_ReviewModel.Update_Hotel_Review( {
      idHotel_Review,
      Title_Hotel,
      Type_Of_Hotel_Reviewer,
      Text_Hotel_Review,
      Cleanliness_Hotel_Rating,
      Comfort_Hotel_Rating,
      Meal_Hotel_Rating,
      Location_Hotel_Rating,
      Service_Hotel_Rating
    });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.editAirlineReview  = async (req, res) => {
  const {
    idAirline_Review,
    Title_Airline,
    Type_Of_Airline_Reviewer,
    Text_Airline_Review,
    CabinCrewRating_Airline_Rating,
    Comfort_Airline_Rating,
    Meal_Airline_Rating,
    Entertainment_Airline_Rating,
  } = req.body;
  try {
    await Rating_ReviewModel.Update_Hotel_Review( {
      idAirline_Review,
      Title_Airline,
      Type_Of_Airline_Reviewer,
      Text_Airline_Review,
      CabinCrewRating_Airline_Rating,
      Comfort_Airline_Rating,
      Meal_Airline_Rating,
      Entertainment_Airline_Rating,
    });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.deleteHotelReview = async (req, res) => {
  try {
    res.send(await Rating_ReviewModel.deleteHotelReviewInfo(req.body.idHotel_Review));
  } catch (err) {
    res.sendStatus(404);
  }
};

exports.deleteAirlineReview = async (req, res) => {
  try {
    res.send(await Rating_ReviewModel.deleteAirlineReviewInfo(req.body.idAirline_Review));
  } catch (err) {
    res.sendStatus(404);
  }
};