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
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_PASSWORD,
    cookie: {
      maxAge: 900000
    },
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
const todoRoutes = require("./routes/todo");
const apiTodoRoutes = require("./routes/api-todo");
const errorsController = require("./controllers/errors");
const indexRoutes = require("./routes/index");
const hotelRoutes = require("./routes/hotel/index");
const hotelBookingRoutes = require("./routes/hotel/booking");
const flightRoutes = require("./routes/flight/index");
const flightBookingRoutes = require("./routes/flight/booking");
const reviewRoutes = require("./routes/review/index");
const userRoutes = require("./routes/user/dashboard");
const userHistoryRoutes = require("./routes/user/dashboard/history");
const userFavoriteRoutes = require("./routes/user/dashboard/favorite");

app.use(indexRoutes);
app.use(authRoutes);


app.use("/admin", adminRoutes);
app.use("/admin/coupon", adminCouponRoutes);
app.use("/admin/flight", adminFlightRoutes);
app.use("/admin/hotel", adminHotelRoutes);
app.use("/admin/staff", adminStaffRoutes);
app.use("/admin/user", adminUserRoutes);

app.get("/", (req, res) => res.render("index", {
  pageTitle: "TravelAloha",
  user: req.user
}));

app.use(authRoutes);
app.use("/api/todo", apiTodoRoutes);
app.use("/todo", todoRoutes);

app.use(errorsController.get404);

app.use((err, req, res, next) => {
  res.status(400).render("errors/400", {
    pageTitle: "TravelAloha - Bad Request",
    user: req.user,
    error: err
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.APP_PORT, () => {
    if (process.env.NODE_ENV !== "production")
      console.log(`Server is up on http://localhost:${process.env.APP_PORT}`);
  });
}

module.exports = app;
