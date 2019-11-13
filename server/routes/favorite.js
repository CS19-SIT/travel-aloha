const express = require("express");
const router = express.Router();

const favoriteController =  require("../controllers/favorites");

router.get('/',favoriteController.getFavoritesPage);

module.exports = router;