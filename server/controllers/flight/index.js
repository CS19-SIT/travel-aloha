exports.getIndex = (req, res) =>
  res.render("flights", {
    pageTitle: "TravelAloha - Flight",
    user: req.user
  });
<<<<<<< HEAD

  exports.findAll = async () => {
    try {
      const flightsData = await db.query("SELECT * FROM Flight");
      const flights = await flightsData[0];
      return flights;
    } catch (err) {
      throw new Error(`[ERR] Flight.findAll: ${err}`);
    }
  };
=======
>>>>>>> 0c980ab50c21cd9f02469b1f7aad9bd0ab98b603
