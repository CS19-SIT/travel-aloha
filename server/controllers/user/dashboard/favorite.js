const Fav = require("../../../models/favorite")
const multer = require("../../../utils/multer-config");
const db = require("../../../db/db")
// exports.getIndex = (req, res) =>
//   res.render("fav/favorite", {
//     pageTitle: "TravelAloha - Dashboard - Favorite",
//     user: req.user
//   });


  
  exports.getIndex = async (req, res) => {
    try {
      let dataH = await Fav.getAllHotel();
      let dataF = await Fav.getAllFlight();
      
  
      res.render("fav/favorite", {
        pageTitle: "TravelAloha",
        user: req.user,
        dataH: dataH,
        dataF: dataF
    
      });
    } catch (err) {
      res.sendStatus(404);
    }
  };


  
  
  exports.savedFavorite = async (req, res) => {
    const favHotelID = req.body.favHotelID.toString();
    const favUserID =  (req.user ? req.user.user_id : null);
  
    try {
        
        await Fav.savedFavorites({
         favHotelID : favHotelID,
         favUserID : favUserID
        });
  res.redirect("/hotel");
       
      }
    
     catch (error) {
     console.error(error);
    } 
  };
  exports.deleteFavorite = async (req, res) => {
    const favHotelID = req.body.favHotelID.toString();
    const favUserID = req.body.favUserID.toString();
 
    try{
     
      await Fav.deleteFavorites({
        favHotelID: favHotelID,
        favUserID:favUserID
      });
      res.redirect("/hotel")
    }
    catch (error) {
      console.error(error);
     } 
  };

  exports.savedFlight = async (req, res) => {
    const flightID = req.body.FlightID.toString();
    const favUserID =  (req.user ? req.user.user_id : null);
  
    try {
        
        await Fav.savedFlights({
         flightID : flightID,
         favUserID : favUserID
        });
  res.redirect("/flight");
       
      }
    
     catch (error) {
     console.error(error);
    } 
  };
  exports.deleteFlight = async (req, res) => {
    const favHotelID = req.body.FlightID.toString();
    const favUserID = req.body.favUserID.toString();
 
    try{
     
      await Fav.deleteFavorites({
        favHotelID: favHotelID,
        favUserID:favUserID
      });
      res.redirect("/hotel")
    }
    catch (error) {
      console.error(error);
     } 
  };