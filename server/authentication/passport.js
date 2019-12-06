const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const redis = require('../utilities/redis');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// ############################# LOCAL STRATEGY #############################

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (username, password, cb) {
        const user = await redis.getAsyncWithCallback(username, UserModel.getUser);
        if (!user) {
            return cb(null, false, {
                returnCode: -3,
                returnMessage: `User ${username} Not Found`
            });
        }

        if (user.status === 0) {
            return cb(null, false, {
                returnCode: -5,
                returnMessage: 'Account Has Been Blocked'
            });
        }

        bcrypt.compare(password, user.password).then((res) => {
            if (!res) {
                return cb(null, false, {
                    returnCode: -2,
                    returnMessage: 'Wrong Password'
                });
            }

            return cb(null, user, {
                returnCode: 1,
                returnMessage: 'Success'
            });
        });
    }
));

// ############################# JWT STRATEGY #############################

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: '1612145'
    },
    async function (jwtPayload, next) {
        const user = await redis.getAsyncWithCallback(jwtPayload.email, UserModel.getUser);
        if (user) {
            next(null, user);
        } else {
            next(null, jwtPayload);
        }
    }
));
