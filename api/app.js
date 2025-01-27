var createError = require('http-errors');
var express = require('express');
var path = require('path');

require('dotenv').config()

// router
var indexRouter = require('./routes/index');
var panelRouter = require('./routes/panel');
var loginRouter = require('./routes/login');
var tokengenerator = require('./routes/token_generator');
const permission_check = require("./controller/token_check");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/*", permission_check.authorization_check())
app.use("/tokengenerator", tokengenerator)
app.use('/', permission_check.permission_check(["visitor","user", "admin"]), indexRouter);
app.use('/login',permission_check.permission_check(["visitor", "admin"]), loginRouter);
app.use("/panel",permission_check.permission_check(["user", "admin"]), panelRouter);


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
