const path = require("path");
// load dependencies
const env = require("dotenv");
const csrf = require("csurf");
const express = require("express");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressHbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store); // initalize sequelize with session store

const app = express();
const csrfProtection = csrf();
const router = express.Router();

//Loading Routes
const webRoutes = require("./routes/web");
const sequelize = require("./config/database");
const Session = require("./app/models/Session");
const errorController = require("./app/controllers/ErrorController");

env.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Create session store
const sessionStore = new SequelizeStore({
  db: sequelize,
  model: Session,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
});

// required for csurf
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    cookie: { path: "/", httpOnly: true, maxAge: 1209600000 }, // maxAge two weeks in milliseconds, remove secure: true for local development
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "web_layout",
    partialsDir: ["views/partials/"],
    extname: "hbs",
    helpers: {
      eq: function (a, b) {
        return a == b;
      },
      calculateDaysOverdue: function (borrowDate) {
        const borrow = new Date(borrowDate);
        const today = new Date();
        const diffTime = Math.abs(today - borrow);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const overdueDays = diffDays - 14; // 14 days is the loan period
        return overdueDays > 0 ? overdueDays : 0;
      },
    },
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(webRoutes);
app.use(errorController.pageNotFound);

sequelize
  //.sync({force : true})
  .sync()
  .then(() => {
    app.listen(process.env.PORT);
    //pending set timezone
    console.log("App listening on port " + process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
