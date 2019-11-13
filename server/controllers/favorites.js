const connector = require("../db/db")

exports.getFavoritesPage = function(req,res){
    let query = "SELECT * FROM fav_hotel as f,hotel as h WHERE f.favHotelID = h.hotelID";
    connector.query(query,function(err,result){
        res.render('fav/favorite',{
            fav:result, 
            pageTitle: 'TravelAloha'
        });
    });
}