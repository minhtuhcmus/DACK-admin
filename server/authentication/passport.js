const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// ############################# LOCAL STRATEGY #############################

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {
        return UserModel.getUser(username)
            .then(user => {
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
            }).catch(err => cb(err));
    }
));

// ############################# JWT STRATEGY #############################

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: '1612145'
    },
    function (jwtPayload, next) {
        UserModel.getUser(jwtPayload.username)
            .then(user => {
                if (!user) {
                    next(null, jwtPayload);
                } else {
                    next(null, user);
                }
            }).catch(() => next(null, jwtPayload));
    }
));
