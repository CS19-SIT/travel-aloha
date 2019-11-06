const Hotel = require("../models/admin-hotel");

exports.getIndex = (req, res) => res.render("admin/admin-hotel", {
    pageTitle: "Travel Aloha - Admin - Hotel Management",
    user: req.user
});

exports.getHotels = async (req, res) =>{
    try {
        let data = await Hotel.getAllHotel();

        res.render("admin/all-hotels", {
            pageTitle: "Travel Aloha - Admin - Manage All hotels",
            user: req.user,
            hotel:data
        });
    } catch (error) {
        res.sendStatus(404);
    }

};

exports.controllerUpdateHotel = async(req,res)=>{
    try {
        await Hotel.modelUpdateHotel(req.body);
        res.sendStatus(204)
    } catch (error) {
        console.log("err at controllerUpdateHotel",error)
        res.sendStatus(404);
    }
}