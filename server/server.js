require("dotenv").config();

/**
 * Import module
 */

const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const session = require("express-session");

const passport = require("./auth/passport");
const MySQLStore = require("express-mysql-session")(session);
const hotel = require("./models/hotelBookingModel/hotel");

const stripe = require('stripe')('sk_test_c8Sj0KgrzEbhjUJFj7vDC84w00OVqNpUbO');



/**
 * Application Initiation
 */

const app = express();

/**
 * Application configuration
 */

const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const publicPath = path.join(__dirname + "/../public");
const viewPath = path.join(publicPath + "/views");

app.set("view engine", "ejs");
app.set("views", viewPath);

app.use(cors());
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_PASSWORD,
        cookie: { maxAge: 900000 },
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(compression());


app.disable("x-powered-by");

/**
 * Routes
 */
const authRoutes = require("./routes/auth");
const userManagementRoutes = require("./routes/userManagement")
const historyRoutes = require("./routes/historySystem");
const adminHotelRoutes = require("./routes/admin-hotel");
const adminCouponRoutes = require("./routes/admin-coupon");
const hotelBookingRoutes = require("./routes/hotel-booking");
const checkoutRoutes = require("./routes/checkout");
const staffAdminRoutes = require("./routes/staffAdmin");
const errorsController = require("./controllers/errors");
const contactSystemRoutes = require("./routes/Contact_System"); 


app.get("/", (req, res) =>
    res.render("index", {
        pageTitle: "TravelAloha",
        user: req.user
    })
);
/**
 * For testing flight_booking ejs
 */
app.use('/',historyRoutes);
app.get("/flight_booking/", (req, res) =>
    res.render("flight_booking/flight_info", {
        pageTitle: "Flight Name",
        user: req.user
    })
);

app.get("/flight_booking/contact", (req, res) =>
    res.render("flight_booking/contact_form", {
        pageTitle: "Contact information",
        user: req.user
    })
);


app.get("/adminDash", (req, res) => res.render("./adminDash/adminDash", {
  pageTitle: "TravelAloha",  user: req.user
}));
app.get("/reviewflight", (req, res) => res.render("./review&rating/reviewAirline", {
  pageTitle: "TravelAloha-reviewAirline",
  user: req.user
}));

app.get("/reviewhotel", (req, res) => res.render("./review&rating/reviewHotel", {
  pageTitle: "TravelAloha-reviewHotel",
  user: req.user
}));


app.get("/flights", (req, res) => res.render("flights", {
  pageTitle: "Flights",
  user: req.user
}));
app.get("/fav", (req, res) => res.render("./fav/favorite", {
  pageTitle: "TravelAloha",
  user: req.user
}));
app.use(authRoutes);
// app.use("/", historyRoutes);
app.use("/admin/hotel", adminHotelRoutes);
app.use("/admin/coupon", adminCouponRoutes);

app.use(hotelBookingRoutes);

app.use("/userManagement", userManagementRoutes);

app.use(errorsController.get404);

// 
//   const a = async (a,b) =>{
//     console.log(await findHotelAndRoom.findHotelAndRoom(a,b));
//   }
// a(1,1);
//
// this is how to use await async
app.listen(process.env.APP_PORT, () => {
    if (process.env.NODE_ENV !== "production")
        console.log(`Server is up on http://localhost:${process.env.APP_PORT}`);
});