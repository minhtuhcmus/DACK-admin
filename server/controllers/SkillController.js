const skillModel = require('../models/Skill');
const redis = require('../utilities/redis');

exports.getAllSkill = async function (req, res, next) {
    try {
        let result = await redis.getAsyncWithCallback('ALL_SKILL',skillModel.getAllSkill);

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

exports.getOneSkill = async function (req, res, next) {
    try {
        const result = await redis.getAsyncWithCallback(req.params.skillID, skillModel.getSkill);

        if (!result) {
            res.json({
                returnCode: -3,
                returnMessage: "Skill Not Found"
            });
            return;
        }
        delete result.updDate;
        delete result.isDeleted;

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

exports.createSkill = async function (req, res, next) {
    try {
        const newSkill = req.body;

        const result = await skillModel.createSkill(newSkill);
        if (result != null && result.affectedRows === 1) {

            redis.del('ALL_SKILL');

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
        console.error('error', e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};

exports.updateSkill = async function (req, res, next) {
    try {
        const skillID = req.params.skillID;
        const newSkill = req.body;

        const result = await skillModel.updateSkill(skillID, newSkill);
        if (result != null && result.affectedRows === 1) {
            redis.del('ALL_SKILL');
            redis.del(skillID);

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

exports.deleteSkill = async function (req, res, next) {
    try {
        const skillID = req.params.skillID;

        const result = await skillModel.deleteSkill(skillID);
        if (result != null && result.affectedRows === 1) {
            redis.del('ALL_SKILL');
            redis.del(skillID);

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
