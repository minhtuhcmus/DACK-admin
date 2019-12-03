const userModel = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

            const {password, updDate, ...newUser} = req.user;

            return res.json({
                returnCode: 1,
                returnMessage: "Đăng nhập thành công",
                data: {
                    token: token,
                    user: newUser
                }
            });
        });
    })(req, res);
};

exports.getAllUser = async function (req, res, next) {
    try {
        let result = await userModel.getAllUser();

        if (!result) {
            result = [];
        }

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
};

exports.getOneUser = async function (req, res, next) {
    try {
        const result = await userModel.getUser(req.params.username);

        if (!result) {
            res.json({
                returnCode: -3,
                returnMessage: "User Not Found"
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
};

exports.createUser = async function (req, res, next) {
    try {
        const newUser = req.body;

        const find = await userModel.getUser(newUser.username);
        if (find != null) {
            res.json({
                returnCode: -4,
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
        console.error('error', e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};

exports.updateUser = async function (req, res, next) {
    try {
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
};

exports.changePassword = async function (req, res, next) {
    try {
        const username = req.params.username;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        const user = await userModel.getUser(username);

        bcrypt.compare(oldPassword, user.password).then(async (compareRes) => {
            if (!compareRes) {
                return res.json({
                    returnCode: -2,
                    returnMessage: "Old Password Not Match"
                });
            }

            const result = await userModel.changePassword(username, newPassword);
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
        });


    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};
