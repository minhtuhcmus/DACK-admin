const userModel = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.login = function (req, res, next) {
    passport.authenticate('local', {
        session: false
    }, (err, user, info) => {
        if (err || !user) {
            return res.json(info);
        }
        req.login(user, {
            session: false
        }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign({
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            }, '1612145');

            const {password, updDate,...newUser} = req.user;

            return res.json({
                returnCode: 1,
                returnMessage: "Đăng nhập thành công",
                data : {
                    token: token,
                    user : newUser
                }
            });
        });
    })(req, res);
};

exports.getAllUser = function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, async (err, user, info) => {
        try {
            if (err || !user) {
                return res.json({
                    returnCode: -1,
                    returnMessage: "JWT Not Valid."
                });
            }

            const result = await userModel.getAllUser();

            if (!result) {
                res.json({
                    returnCode: -3,
                    returnMessage: "Cannot Get List User."
                });
                return;
            }

            res.json({
                returnCode: 1,
                returnMessage: "Success",
                data: result
            })
        } catch (e) {
            console.error(e);
            return res.json({
                returnCode: 0,
                returnMessage: "Exception. Retry Later."
            });
        }
    })(req, res, next);
};

exports.getOneUser = function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, async (err, user, info) => {
        try {
            if (err || !user) {
                return res.json({
                    returnCode: -1,
                    returnMessage: "JWT Not Valid."
                });
            }

            const result = await userModel.getUser(req.params.username);

            if (!result) {
                res.json({
                    returnCode: -3,
                    returnMessage: "Cannot Get User's Info."
                });
                return;
            }
            delete result.password;
            delete result.updDate;

            return res.json({
                returnCode: 1,
                returnMessage: "Success",
                data: result
            })
        } catch (e) {
            console.error(e);
            return res.json({
                returnCode: 0,
                returnMessage: "Exception. Retry Later."
            });
        }
    })(req, res, next);
};

exports.createUser = function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, async (err, user, info) => {
        try {
            if (err || !user) {
                return res.json({
                    returnCode: -1,
                    returnMessage: "JWT Not Valid"
                });
            }

            const newUser = req.body;

            const find = await userModel.getUser(newUser.username);
            if (find != null) {
                res.json({
                    returnCode: -2,
                    returnMessage: "Username Is Already Existed. Please Choose Another Username."
                });
                return;
            }

            const result = await userModel.createUser(newUser);
            if (result != null && result.affectedRows === 1) {
                res.json({
                    returnCode: 1,
                    returnMessage: "Success"
                });
            } else {
                res.json({
                    returnCode: 0,
                    returnMessage: "Hệ Thống Có Lỗi. Vui Lòng Thử Lại Sau."
                });
            }
        } catch (e) {
            console.error(e);
            return res.json({
                returnCode: 0,
                returnMessage: "Exception. Retry Later."
            });
        }
    })(req, res, next);
};

exports.updateUser = function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, async (err, user, info) => {
        try {
            if (err || !user) {
                return res.json({
                    returnCode: -1,
                    returnMessage: "JWT Not Valid."
                });
            }
            const username = req.params.username;
            const newUser = req.body;

            const result = await userModel.updateUser(username, newUser);
            if (result != null && result.affectedRows === 1) {
                res.json({
                    returnCode: 1,
                    returnMessage: "Success"
                });
            } else {
                res.json({
                    returnCode: 0,
                    returnMessage: "Exception. Retry Later."
                });
            }
        } catch (e) {
            console.error(e);
            return res.json({
                returnCode: 0,
                returnMessage: "Exception. Retry Later."
            });
        }
    })(req, res, next);
};

exports.changePassword = function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, async (err, user, info) => {
        try {
            if (err || !user) {
                return res.json({
                    returnCode: -1,
                    returnMessage: "JWT Not Valid"
                });
            }
            const username = req.params.username;
            const password = req.body.password;

            const result = await userModel.changePassword(username, password);
            if (result != null && result.affectedRows === 1) {
                res.json({
                    returnCode: 1,
                    returnMessage: "Success"
                });
            } else {
                res.json({
                    returnCode: 0,
                    returnMessage: "Exception. Retry Later."
                });
            }
        } catch (e) {
            console.error(e);
            return res.json({
                returnCode: 0,
                returnMessage: "Exception. Retry Later."
            });
        }
    })(req, res, next);
};
