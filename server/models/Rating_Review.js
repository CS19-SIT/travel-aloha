const db = require("../db/db");

exports.getHotelReviewInfo = async ({
  Title_Hotel,
  Text_Hotel_Review,
  timestamp,
  Cleanliness_Hotel_Rating,
  Comfort_Hotel_Rating,
  Meal_Hotel_Rating,
  Location_Hotel_Rating,
  Service_Hotel_Rating,
  hotel_hotelId
}) => {
  try {
    await db.query("SELECT * FROM Hotel_Review where hotel_hotelId = ?", [
      Title_Hotel,
      Text_Hotel_Review,
      timestamp,
      Cleanliness_Hotel_Rating,
      Comfort_Hotel_Rating,
      Meal_Hotel_Rating,
      Location_Hotel_Rating,
      Service_Hotel_Rating,
      hotel_hotelId
    ]);
  } catch (error) {
    throw new Error(`[ERR] getHotelReviewInfo: ${err}`);
  }
};

exports.getFlightReviewInfo = async ({
    Title_Flight,
    Text_Flight_Review,
    timestamp,
    CabinCrewRating_Flight_Rating,
    Comfort_Flight_Rating,
    Meal_Flight_Rating,
    Entertainment_Flight_Rating,
    Flight_Flight_number
  }) => {
    try {
      await db.query("SELECT * FROM Flight_Review where Flight_Flight_number = ?", [
        Title_Flight,
        Text_Flight_Review,
        timestamp,
        CabinCrewRating_Flight_Rating,
        Comfort_Flight_Rating,
        Meal_Flight_Rating,
        Entertainment_Flight_Rating,
        Flight_Flight_number
      ]);
    } catch (error) {
      throw new Error(`[ERR] getFlightReviewInfo: ${err}`);
    }
  };

exports.modelUpdateHotel = async data => {
  try {
    console.log("From mode", data);
    await db.query(
      "UPDATE Hotel_Review set Title_Flight = ? , Text_Flight_Review = ?, CabinCrewRating_Flight_Rating = ?,  WHERE hotelId = ?",
      [data.hotelAddress, data.hotelTelNumber, data.hotelEmail, data.hotelId]
    );
  } catch (err) {
    throw new Error(`[ERR] modelUpdateHotel: ${err}`);
  }
};

exports.insertNewHotel_Review = async ({
  Title_Hotel,
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
      `INSERT INTO Hotel_Review(Title_Hotel, Text_Hotel_Review, Cleanliness_Hotel_Rating, Comfort_Hotel_Rating, Meal_Hotel_Rating, Location_Hotel_Rating, Service_Hotel_Rating, hotel_hotelId) VALUES(?,?,?,?,?,?,?,?)`,
      [
        Title_Hotel,
        Text_Hotel_Review,
        Cleanliness_Hotel_Rating,
        Comfort_Hotel_Rating,
        Meal_Hotel_Rating,
        Location_Hotel_Rating,
        Service_Hotel_Rating,
        hotel_hotelId
      ]
    );
  } catch (error) {
    throw new Error(`[ERR] insertNewHotel_Review: ${error}`);
  }
};

exports.insertNewFlight_Review = async ({
  Title_Flight,
  Text_Flight_Review,
  CabinCrewRating_Flight_Rating,
  Comfort_Flight_Rating,
  Meal_Flight_Rating,
  Entertainment_Flight_Rating,
  Flight_Flight_number
}) => {
  try {
    await db.query(
      `INSERT INTO Flight_Review(Title_Flight, Text_Flight_Review, CabinCrewRating_Flight_Rating, Comfort_Flight_Rating, Meal_Flight_Rating, Entertainment_Flight_Rating, Flight_Flight_number) VALUES(?,?,?,?,?,?,?)`,
      [
        Title_Flight,
        Text_Flight_Review,
        CabinCrewRating_Flight_Rating,
        Comfort_Flight_Rating,
        Meal_Flight_Rating,
        Entertainment_Flight_Rating,
        Flight_Flight_number
      ]
    );
  } catch (error) {
    throw new Error(`[ERR] insertNewFlight_Review: ${error}`);
  }
};

exports.deleteHotelReviewInfo = async idHotel_Review => {
  try {
    await db.query("DELETE FROM Hotel_Review WHERE idHotel_Review = ?", [
      idHotel_Review
    ]);
  } catch (err) {
    throw new Error(`[ERR] deleteHotelReviewInfo: ${err}`);
  }
};

exports.deleteFlightReviewInfo = async idFlight_Review => {
  try {
    await db.query("DELETE FROM Flight_Review WHERE idFlight_Review = ?", [
      idFlight_Review
    ]);
  } catch (err) {
    throw new Error(`[ERR] deleteFlightReviewInfo: ${err}`);
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
