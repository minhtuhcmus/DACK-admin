require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const passport = require('passport');
const axios = require('axios');
const morgan = require('morgan');
const UserModel = require('./models/User');

const authenRoute = require('./routes/AuthenRoute');
const userRoute = require('./routes/UserRoute');
const jwtUtil = require('./authentication/jwt');

require('./authentication/passport');

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
});

const app = express();

app.use(morgan(':method :url :status :response-time ms - :body - '));

// ############ init MySQL Connection ############
const mysql = require('./utilities/mysql');
(async () => {
    try {
        await mysql.initConnection();
        console.log('### MySQL Connected ###');
    } catch (e) {
        console.error('### MySQL Connection Failed :' + e);
        process.exit();
    }
})();

// ########### init Redis Connection ############
const redis = require('./utilities/redis');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', authenRoute);
app.use('/api', jwtUtil.validateToken, userRoute);

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
