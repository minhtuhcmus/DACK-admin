const userModel = require('../models/User');
const redis = require('../utilities/redis');

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
        next(e);
    }
};

exports.getOneUser = async function (req, res, next) {
    try {
        const result = await userModel.getUser(req.params.email);

        if (!result) {
            return res.json({
                returnCode: -3,
                returnMessage: "User Not Found"
            });
        }
        delete result.password;
        delete result.updDate;

        return res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: result
        })
    } catch (e) {
        next(e);
    }
};

exports.updateUser = async function (req, res, next) {
    try {
        const username = req.params.email;
        const newStatus = req.body.status;

        const result = await userModel.updateUser(username, newStatus);
        if (result != null && result.affectedRows === 1) {
            redis.del('ALL_TEACHER');
            redis.del(`TEACHER_${username}`);
            redis.del(`STUDENT_${username}`);

            return res.json({
                returnCode: 1,
                returnMessage: "Success"
            });
        } else {
            next('error');
        }
    } catch (e) {
        next(e);
    }
};
