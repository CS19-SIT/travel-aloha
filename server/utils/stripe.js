const stripe = require("stripe")(process.env.STRIPE_TOKEN);

module.exports = stripe;