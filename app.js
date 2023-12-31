var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var dotenv = require("dotenv");
const routes = require('./routes/v1/index')

dotenv.config();
let DATABASE_CONNECTION = process.env.DATABASE_PROD_CONNECTION;
if (process.env.NODE_ENV === "development") {
    DATABASE_CONNECTION = process.env.DATABASE_DEV_CONNECTION;
}


mongoose.connect(DATABASE_CONNECTION).then((res) => {
    console.log("Database connected");
}).catch(error => {
    console.log(error);
});

var app = express();
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json({limit: '10mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(bodyParser.json())

app.use("/api/v1", routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
