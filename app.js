require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

//work around for an issue
var Company = require("./models/company")
var Share = require("./models/share")
//work around for an issue

var indexRouter = require('./routes/index');
var sharesRouter = require('./routes/shares');
var companyRouter = require('./routes/companies')

var app = express();

//setup db connection
mongoose.connect(process.env.DB_URI, {useUnifiedTopology: true, useNewUrlParser: true,}
    , () => console.log("connected to db"));

mongoose.connection.on('error', console.error.bind(console, 'db connection error'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/securities', sharesRouter);
app.use('/api/company', companyRouter);

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
