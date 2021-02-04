require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

//work around for an issue
const Company = require("./models/company")
const Share = require("./models/share")
//work around for an issue

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const sharesRouter = require('./routes/shares');
const companyRouter = require('./routes/companies')

const app = express();

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
app.use('/api/auth', authRouter);
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
