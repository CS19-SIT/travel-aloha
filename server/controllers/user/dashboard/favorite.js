const Fav = require("../../../models/favorite")
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
 
  