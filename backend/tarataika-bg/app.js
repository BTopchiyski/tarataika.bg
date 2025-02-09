var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var myParser = require('body-parser');

const db = require('./models');

db.sequelize.sync();

var app = express();
app.use(cookieParser());
app.use(myParser.urlencoded({
  parameterLimit: 100000,
  limit: '50mb',
  extended: true
}));
app.use(myParser.json())
var categories = require('./routes/vehicle-categories.routes')(app);
var models = require('./routes/models.routes')(app);
var listings = require('./routes/listings.routes')(app);
var engines = require('./routes/engines.routes')(app);
var gearboxes = require('./routes/gearboxes.routes')(app);
var locations = require('./routes/locations.routes')(app);
var ecategories = require('./routes/ecategories.routes')(app);
var paints = require('./routes/paints.routes')(app);
var vehicleExtras = require('./routes/vehicle-extras.routes')(app);
var users = require('./routes/users.routes')(app);
var pictures = require('./routes/pictures.routes')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

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
