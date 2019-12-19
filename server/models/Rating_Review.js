const db = require("../db/db");

exports.getHotelRating = async (hotelId) => {
  try {
      let query = `
SELECT count(*)            AS total,
     sum(case
             when (Cleanliness_Hotel_Rating +
                   Comfort_Hotel_Rating +
                   Meal_Hotel_Rating +
                   Location_Hotel_Rating + Service_Hotel_Rating) / 5 > 8 then 1
             else 0 end) AS Wonderful,
     sum(case
             when (Cleanliness_Hotel_Rating +
                   Comfort_Hotel_Rating +
                   Meal_Hotel_Rating +
                   Location_Hotel_Rating + Service_Hotel_Rating) / 5 < 9 AND (Cleanliness_Hotel_Rating +
                                                                              Comfort_Hotel_Rating +
                                                                              Meal_Hotel_Rating +
                                                                              Location_Hotel_Rating +
                                                                              Service_Hotel_Rating) / 5 > 6 then 1
             else 0 end) AS Good,
     sum(case
             when (Cleanliness_Hotel_Rating +
                   Comfort_Hotel_Rating +
                   Meal_Hotel_Rating +
                   Location_Hotel_Rating + Service_Hotel_Rating) / 5 < 7 AND (Cleanliness_Hotel_Rating +
                                                                              Comfort_Hotel_Rating +
                                                                              Meal_Hotel_Rating +
                                                                              Location_Hotel_Rating +
                                                                              Service_Hotel_Rating) / 5 > 4 then 1
             else 0 end) AS Okey,
     sum(case
             when (Cleanliness_Hotel_Rating +
                   Comfort_Hotel_Rating +
                   Meal_Hotel_Rating +
                   Location_Hotel_Rating + Service_Hotel_Rating) / 5 < 5 AND (Cleanliness_Hotel_Rating +
                                                                              Comfort_Hotel_Rating +
                                                                              Meal_Hotel_Rating +
                                                                              Location_Hotel_Rating +
                                                                              Service_Hotel_Rating) / 5 > -1 then 1
             else 0 end) AS Poor
FROM Hotel_Review
WHERE hotel_hotelId = ?
`;
      const hotelRating = await db.query(query, [hotelId]);
      // console.log(hotelReview);
      return hotelRating;
  } catch (getHotelRatingError) {
      throw new Error(`[ERR] getHotelRatingError: ${getHotelRatingError}`);
  }
}

exports.getHotelReviewInfo = async (
  hotelId,
  Type_Of_Hotel_Reviewer,
  Sort,
  Score
) => {
  try {
    const ScoreQuery = "(Cleanliness_Hotel_Rating + Comfort_Hotel_Rating + Meal_Hotel_Rating + Location_Hotel_Rating+Service_Hotel_Rating)/5"
    let query =
    `SELECT idHotel_Review, Title_Hotel, Text_Hotel_Review, timestamp, Type_Of_Hotel_Reviewer, ${ScoreQuery} as Score, firstname, profile_picture, userId FROM Hotel_Review INNER JOIN user ON Hotel_Review.userId = user.user_id where hotel_hotelId = ? `;
    
    switch (Type_Of_Hotel_Reviewer) {
      case "Business trip":
        query += "AND Type_Of_Hotel_Reviewer = 'Business Trip' ";
      case "Family vacation":
        query += "AND Type_Of_Hotel_Reviewer = 'Family vacation' ";
      case "Romantic vacation":
        query += "AND Type_Of_Hotel_Reviewer = 'Romantic vacation' ";
      case "Shopping and Culinary":
        query += "AND Type_Of_Hotel_Reviewer = 'Shopping and Culinary' ";
      case "Backpacking":
        query += "AND Type_Of_Hotel_Reviewer = 'Backpacking' ";
      case "Medical Travel":
        query += "AND Type_Of_Hotel_Reviewer = 'Medical Travel' ";
      default:
        break;
    }

    switch (Score) {
      case "Wonderful":
          query += `AND ${ScoreQuery} > 8 `;//9-10
          break;
      case "Good":
          query += `AND ${ScoreQuery} > 6 `;//7-8
          break;
      case "Okey":
          query += `AND ${ScoreQuery} > 4 `;//5-6
          break;
      case "Poor":
          query += `AND ${ScoreQuery} > 2 `;//3-4
          break;
      default:
          break;//All
  }
    query += "GROUP BY idHotel_Review "

    switch (Sort) {
      case "Newest":
        query += " ORDER BY timestamp DESC";
        break;
      case "Oldest":
        query += " ORDER BY timestamp ASC";
        break;
      default:
        break;
    }

    // console.log(query);

    const hotelReview = await db.query(query, [hotelId]);
    // console.log(hotelReview);
    return hotelReview;
  } catch (error) {
    console.log(error);
    throw new Error(`[ERR] getHotelReviewInfo: ${error}`);
  }
};

exports.getAirlineRating = async (airlineId) => {
  try {
      let query = `
SELECT count(*)            AS total,
     sum(case
             when (CabinCrewRating_Airline_Rating + Comfort_Airline_Rating + Meal_Airline_Rating + Entertainment_Airline_Rating)/4 / 5 > 8 then 1
             else 0 end) AS Wonderful,
     sum(case
             when (CabinCrewRating_Airline_Rating + Comfort_Airline_Rating + Meal_Airline_Rating + Entertainment_Airline_Rating)/4 < 9 AND (CabinCrewRating_Airline_Rating + Comfort_Airline_Rating + Meal_Airline_Rating + Entertainment_Airline_Rating)/4 > 6 then 1
             else 0 end) AS Good,
     sum(case
             when (CabinCrewRating_Airline_Rating + Comfort_Airline_Rating + Meal_Airline_Rating + Entertainment_Airline_Rating)/4 < 7 AND (CabinCrewRating_Airline_Rating + Comfort_Airline_Rating + Meal_Airline_Rating + Entertainment_Airline_Rating)/4 > 4 then 1
             else 0 end) AS Okey,
     sum(case
             when (CabinCrewRating_Airline_Rating + Comfort_Airline_Rating + Meal_Airline_Rating + Entertainment_Airline_Rating)/4< 5 AND (CabinCrewRating_Airline_Rating + Comfort_Airline_Rating + Meal_Airline_Rating + Entertainment_Airline_Rating)/4 > -1 then 1
             else 0 end) AS Poor
FROM Airline_Review
WHERE airlineId_fk = ?
`;
      const airlineRating = await db.query(query, [airlineId]);
      // console.log(hotelReview);
      return airlineRating;
  } catch (getAirlineRatingError) {
      throw new Error(`[ERR] getHotelRatingError: ${getAirlineRatingError}`);
  }
}

exports.getAirlineReviewInfo = async (airline_Id, Type_Of_Airline_Reviewer,
  Sort,
  Score) => {
  try {
    const ScoreQuery = "(CabinCrewRating_Airline_Rating + Comfort_Airline_Rating + Meal_Airline_Rating + Entertainment_Airline_Rating)/4";
    let query =
    `SELECT idAirline_Review, Title_Airline, Text_Airline_Review, timestamp, Type_Of_Airline_Reviewer, ${ScoreQuery} as Score, firstname, profile_picture, userId FROM Airline_Review INNER JOIN user ON Airline_Review.userId = user.user_id where airlineId_fk = ? `;

    switch (Type_Of_Airline_Reviewer) {
      case "Economic":
        query += "AND Type_Of_Airline_Reviewer = 'Economic' ";
      case "Premium Economic":
        query += "AND Type_Of_Airline_Reviewer = 'Premium Economic' ";
      case "Business":
        query += "AND Type_Of_Airline_Reviewer = 'Business' ";
      case "First Class":
        query += "AND Type_Of_Airline_Reviewer = 'First Class' ";
      default:
        break;
    }

    switch (Score) {
      case "Wonderful":
          query += `AND ${ScoreQuery} > 8 `;//9-10
          break;
      case "Good":
          query += `AND ${ScoreQuery} > 6 `;//7-8
          break;
      case "Okey":
          query += `AND ${ScoreQuery} > 4 `;//5-6
          break;
      case "Poor":
          query += `AND ${ScoreQuery} > 2 `;//3-4
          break;
      default:
          break;//All
  }
    query += "GROUP BY idAirline_Review "

    switch (Sort) {
      case "Newest":
        query += " ORDER BY timestamp DESC";
        break;
      case "Oldest":
        query += " ORDER BY timestamp ASC";
        break;
      default:
        break;
    }
    const airlineReview = await db.query(query,
      [airline_Id]
    );
    return airlineReview;
  } catch (error) {
    console.log(error);
    throw new Error(`[ERR] getAirlineReviewInfo: ${err}`);
  }
};

exports.Update_Hotel_Review = async (userId, Title_Hotel, Text_Hotel_Review, Cleanliness_Hotel_Rating, Comfort_Hotel_Rating, Meal_Hotel_Rating, Location_Hotel_Rating, Service_Hotel_Rating,Type_Of_Hotel_Reviewer) => {
  try {
    await db.query(
      "UPDATE Hotel_Review set Title_Hotel = ?, Text_Hotel_Review = ?, Cleanliness_Hotel_Rating = ?, Comfort_Hotel_Rating = ?, Meal_Hotel_Rating = ?, Location_Hotel_Rating = ?, Service_Hotel_Rating = ?,Type_Of_Hotel_Reviewer = ? WHERE idHotel_Review = ?)",
      [Title_Hotel, Text_Hotel_Review, Cleanliness_Hotel_Rating, Comfort_Hotel_Rating, Meal_Hotel_Rating, Location_Hotel_Rating, Service_Hotel_Rating,Type_Of_Hotel_Reviewer]
    );
  } catch (err) {
    throw new Error(`[ERR] modelUpdateHotel: ${err}`);
  }
};

exports.Update_Airline_Review = async (Title_Airline, Text_Airline_Review, CabinCrewRating_Airline_Rating, Comfort_Airline_Rating, Meal_Airline_Rating, Entertainment_Airline_Rating, Type_Of_Airline_Reviewer) => {
  try {
    await db.query(
      "UPDATE Airline_Review set Title_Airline = ?, Text_Airline_Review = ?, CabinCrewRating_Airline_Rating = ?, Comfort_Airline_Rating = ?, Meal_Airline_Rating = ?, Entertainment_Airline_Rating = ?, Type_Of_Airline_Reviewer = ? WHERE idAirline_Review = ?)",
      [Title_Airline, Text_Airline_Review, CabinCrewRating_Airline_Rating, Comfort_Airline_Rating, Meal_Airline_Rating, Entertainment_Airline_Rating, Type_Of_Airline_Reviewer]
    );
  } catch (err) {
    throw new Error(`[ERR] modelUpdateAirline: ${err}`);
  }
};

exports.insertNewHotel_Review = async ({
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
}) => {
  try {
    await db.query(
      `INSERT INTO Hotel_Review(userId, Title_Hotel, Text_Hotel_Review, Cleanliness_Hotel_Rating, Comfort_Hotel_Rating, Meal_Hotel_Rating, Location_Hotel_Rating, Service_Hotel_Rating,Type_Of_Hotel_Reviewer, hotel_hotelId) VALUES(?,?,?,?,?,?,?,?,?,?)`,
      [
        userId,
        Title_Hotel,
        Text_Hotel_Review,
        Cleanliness_Hotel_Rating,
        Comfort_Hotel_Rating,
        Meal_Hotel_Rating,
        Location_Hotel_Rating,
        Service_Hotel_Rating,
        Type_Of_Hotel_Reviewer,
        hotel_hotelId
      ]
    );
  } catch (error) {
    throw new Error(`[ERR] insertNewHotel_Review: ${error}`);
  }
};

exports.insertNewHotelReviewPicture = async ({ Hotel_Review_Picture_URL }) => {
  try {
    await db.query(
      `INSERT INTO Hotel_Review_Picture_URL(Hotel_Review_Picture_URL, Hotel_Review_idHotel_Review) VALUES(?,?)`,
      [Hotel_Review_Picture_URL]
    );
  } catch (error) {
    throw new Error(`[ERR] insertNewHotelReviewPicture: ${error}`);
  }
};

exports.insertNewAirline_Review = async ({
  userId,
  Title_Airline,
  Type_Of_Airline_Reviewer,
  Text_Airline_Review,
  CabinCrewRating_Airline_Rating,
  Comfort_Airline_Rating,
  Meal_Airline_Rating,
  Entertainment_Airline_Rating,
  airlineId_fk
}) => {
  try {
    await db.query(
      `INSERT INTO Airline_Review(Title_Airline, Text_Airline_Review, CabinCrewRating_Airline_Rating, Comfort_Airline_Rating, Meal_Airline_Rating, Entertainment_Airline_Rating, Type_Of_Airline_Reviewer, airlineId_fk, userId) VALUES(?,?,?,?,?,?,?,?,?)`,
      [
        Title_Airline,
        Text_Airline_Review,
        CabinCrewRating_Airline_Rating,
        Comfort_Airline_Rating,
        Meal_Airline_Rating,
        Entertainment_Airline_Rating,
        Type_Of_Airline_Reviewer,
        airlineId_fk,
        userId
      ]
    );
  } catch (error) {
    throw new Error(`[ERR] insertNewAirline_Review: ${error}`);
  }
};

exports.insertNewAirlineReviewPicture = async ({
  Airline_Review_Picture_URL
}) => {
  try {
    await db.query(
      `INSERT INTO Airline_Review_Picture_URL(Airline_Review_Picture_URL, Airline_Review_idFlight_Review) VALUES(?,?)`,
      [Airline_Review_Picture_URL]
    );
  } catch (error) {
    throw new Error(`[ERR] insertNeAirlineReviewPicture: ${error}`);
  }
};

exports.deleteHotelReviewInfo = async (userId, idHotel_Review) => {
  try {
      return await db.query("DELETE FROM Hotel_Review WHERE idHotel_Review = ? AND userId = ?", [
          idHotel_Review,
          userId
      ]);
  } catch (err) {
      throw new Error(`[ERR] deleteHotelReviewInfo: ${err}`);
  }
};

exports.deleteAirlineReviewInfo = async (userId, idAirline_Review) => {
  try {
    await db.query("DELETE FROM Airline_Review WHERE idAirline_Review = ?AND userId = ?", [
      idAirline_Review,
      userId
    ]);
  } catch (err) {
    throw new Error(`[ERR] deleteAirlineReviewInfo: ${err}`);
  }
};

// CREATE TABLE IF NOT EXISTS `development`.`Flight_Review` (
//     `idFlight_Review` INT(10) NOT NULL,
//     `Title_Flight` VARCHAR(300) NULL DEFAULT NULL,
//     `Text_Flight_Review` VARCHAR(300) NULL DEFAULT NULL,
//     `timestamp` TIMESTAMP NULL DEFAULT NULL,
//     `CabinCrewRating_Flight_Rating` INT(10) NULL DEFAULT NULL,
//     `Comfort_Flight_Rating` INT(10) NULL DEFAULT NULL,
//     `Meal_Flight_Rating` INT(10) NULL DEFAULT NULL,
//     `Entertainment_Flight_Rating` INT(10) NULL DEFAULT NULL,
//     `Flight_Flight_number` CHAR(7) NOT NULL,
//     PRIMARY KEY (`idFlight_Review`),
//     INDEX `fk_Flight_Review_Flight1_idx` (`Flight_Flight_number` ASC) VISIBLE,
//     CONSTRAINT `fk_Flight_Review_Flight1`
//       FOREIGN KEY (`Flight_Flight_number`)
//       REFERENCES `development`.`Flight` (`Flight_number`)
//       ON DELETE NO ACTION
//       ON UPDATE NO ACTION)
//   ENGINE = InnoDB
//   DEFAULT CHARACTER SET = utf8
//   COLLATE = utf8_unicode_ci

// CREATE TABLE IF NOT EXISTS `development`.`Member_Review` (
//     `idMember_Review` INT(11) NOT NULL,
//     `Hotel_Review_idHotel_Review` INT(10) NOT NULL,
//     `user_user_id` CHAR(36) NOT NULL,
//     `Flight_Review_idFlight_Review` INT(10) NOT NULL,
//     PRIMARY KEY (`idMember_Review`),
//     INDEX `fk_Member_Review_Hotel_Review1_idx` (`Hotel_Review_idHotel_Review` ASC) VISIBLE,
//     INDEX `fk_Member_Review_user1_idx` (`user_user_id` ASC) VISIBLE,
//     INDEX `fk_Member_Review_Flight_Review1_idx` (`Flight_Review_idFlight_Review` ASC) VISIBLE,
//     CONSTRAINT `fk_Member_Review_Hotel_Review1`
//       FOREIGN KEY (`Hotel_Review_idHotel_Review`)
//       REFERENCES `development`.`Hotel_Review` (`idHotel_Review`),
//     CONSTRAINT `fk_Member_Review_user1`
//       FOREIGN KEY (`user_user_id`)
//       REFERENCES `development`.`user` (`user_id`),
//     CONSTRAINT `fk_Member_Review_Flight_Review1`
//       FOREIGN KEY (`Flight_Review_idFlight_Review`)
//       REFERENCES `development`.`Flight_Review` (`idFlight_Review`)
//       ON DELETE NO ACTION
//       ON UPDATE NO ACTION)
//   ENGINE = InnoDB
//   DEFAULT CHARACTER SET = utf8
//   COLLATE = utf8_unicode_ci

//   CREATE TABLE IF NOT EXISTS `development`.`Hotel_Review` (
//     `idHotel_Review` INT(10) NOT NULL,
//     `Title_Hotel` VARCHAR(300) NULL DEFAULT NULL,
//     `Text_Hotel_Review` VARCHAR(300) NULL DEFAULT NULL,
//     `timestamp` TIMESTAMP NULL DEFAULT NULL,
//     `Cleanliness_Hotel_Rating` INT(10) NULL DEFAULT NULL,
//     `Comfort_Hotel_Rating` INT(10) NULL DEFAULT NULL,
//     `Meal_Hotel_Rating` INT(10) NULL DEFAULT NULL,
//     `Location_Hotel_Rating` INT(10) NULL DEFAULT NULL,
//     `Service_Hotel_Rating` INT(10) NULL DEFAULT NULL,
//     `hotel_hotelId` INT(10) UNSIGNED NOT NULL,
//     PRIMARY KEY (`idHotel_Review`),
//     INDEX `fk_Hotel_Review_hotel1_idx` (`hotel_hotelId` ASC) VISIBLE,
//     CONSTRAINT `fk_Hotel_Review_hotel1`
//       FOREIGN KEY (`hotel_hotelId`)
//       REFERENCES `development`.`hotel` (`hotelId`))
//   ENGINE = InnoDB
//   DEFAULT CHARACTER SET = utf8
//   COLLATE = utf8_unicode_ci

//   CREATE TABLE IF NOT EXISTS `development`.`Flight_Review_Picture_URL` (
//     `Flight_Review_Picture_URL` VARCHAR(300) NOT NULL,
//     `Flight_Review_idHotel_Review` INT(10) NOT NULL,
//     PRIMARY KEY (`Flight_Review_Picture_URL`),
//     INDEX `fk_Flight_Review_Picture_URL_Flight_Review1_idx` (`Flight_Review_idHotel_Review` ASC) VISIBLE,
//     CONSTRAINT `fk_Flight_Review_Picture_URL_Flight_Review1`
//       FOREIGN KEY (`Flight_Review_idHotel_Review`)
//       REFERENCES `development`.`Flight_Review` (`idFlight_Review`))
//   ENGINE = InnoDB
//   DEFAULT CHARACTER SET = utf8
//   COLLATE = utf8_unicode_ci

//   CREATE TABLE IF NOT EXISTS `development`.`Hotel_Review_Picture_URL` (
//     `Hotel_Review_Picture_URL` VARCHAR(300) NOT NULL,
//     `Hotel_Review_idHotel_Review` INT(10) NOT NULL,
//     PRIMARY KEY (`Hotel_Review_Picture_URL`),
//     INDEX `fk_Hotel_Review_Picture_URL_Hotel_Review1_idx` (`Hotel_Review_idHotel_Review` ASC) VISIBLE,
//     CONSTRAINT `fk_Hotel_Review_Picture_URL_Hotel_Review1`
//       FOREIGN KEY (`Hotel_Review_idHotel_Review`)
//       REFERENCES `development`.`Hotel_Review` (`idHotel_Review`))
//   ENGINE = InnoDB
//   DEFAULT CHARACTER SET = utf8
//   COLLATE = utf8_unicode_ci
