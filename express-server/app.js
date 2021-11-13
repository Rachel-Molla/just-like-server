global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressRateLimit = require("express-rate-limit");
const sanitize = require("./middleware/sanitize");
const cors = require("cors");
const authController = require("./controllers-layer/auth-controller");
//const userAccountsRouter = require("./routes/user-accounts.routes")
//const io = require('socket.io')(http);
//const url = require("url");
//const bodyParser = require('body-parser');

// create express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// DOS Attack protection:
app.use("/api/", expressRateLimit({
  windowMs: 1000, // 1 second
  max: 10, // limit each IP to 5 requests per windowMs
  message: "Are You a Hacker?" 
}));

app.use(logger('dev'));
//use express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable cookies: 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// XSS attack protection:
app.use(sanitize);

//enable access to the api from outside origins
app.use(cors());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

app.use("/api/auth",authController);

//app.use('/api/accounts', userAccountsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
