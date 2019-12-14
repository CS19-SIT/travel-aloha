const connector = require("../../../db/db")
// exports.getIndex = (req, res) =>
//   res.render("fav/favorite", {
//     pageTitle: "TravelAloha - Dashboard - Favorite",
//     user: req.user
//   });


  exports.getIndex = function(req,res){
      let query = "SELECT * FROM fav_hotel as f,hotel as h WHERE f.favHotelID = h.hotelID";
      connector.query(query,function(err,result){
          res.render('fav/favorite',{
              fav:result,
              user:req.user,
              pageTitle: 'TravelAloha'
          });
      });
  }