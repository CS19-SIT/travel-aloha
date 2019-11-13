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
const adminRoutes = require("./routes/admin/index");
const adminCouponRoutes = require("./routes/admin/coupon");
const adminHotelRoutes = require("./routes/admin/hotel");
const adminStaffRoutes = require("./routes/admin/staff");
const adminUserRoutes = require("./routes/admin/user");
const authRoutes = require("./routes/auth/index");
const checkoutRoutes = require("./routes/checkout/index");
const contactRoutes = require("./routes/contact/index");
const errorsController = require("./controllers/errors");
const indexRoutes = require("./routes/index");
const hotelBookingRoutes = require("./routes/hotel/booking");
const flightRoutes = require("./routes/flight/index");
const flightBookingRoutes = require("./routes/flight/booking");
const reviewRoutes = require("./routes/review/index");
const userHistoryRoutes = require("./routes/user/dashboard/history");
const userFavoriteRoutes = require("./routes/user/dashboard/favorite");

app.use(indexRoutes);
app.use(authRoutes);

app.use("/admin", adminRoutes);
app.use("/admin/coupon", adminCouponRoutes);
app.use("/admin/hotel", adminHotelRoutes);
app.use("/admin/staff", adminStaffRoutes);
app.use("/admin/user", adminUserRoutes);

app.use("/checkout", checkoutRoutes);
app.use("/contact", contactRoutes);

app.use("/dashboard/history", userHistoryRoutes);
app.use("/dashboard/favorite", userFavoriteRoutes);

app.use("/hotel/booking", hotelBookingRoutes);

app.use("/flight", flightRoutes);
app.use("/flight/booking", flightBookingRoutes);

app.use("/review", reviewRoutes);

app.use(errorsController.get404);

app.listen(process.env.APP_PORT, () => {
  if (process.env.NODE_ENV !== "production")
    console.log(`Server is up on http://localhost:${process.env.APP_PORT}`);
});
