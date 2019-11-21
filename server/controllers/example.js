const example = require("../models/example");

exports.getAll = async (req,res)=>{
    try{
        let data = await example.getAllCountry();
        // console.log(data);
        res.render("example", {
            pageTitle: "TravelAloha",
            user: req.user,
            country:data
          });
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
}