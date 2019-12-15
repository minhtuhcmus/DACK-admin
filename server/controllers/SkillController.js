const skillModel = require('../models/Skill');
const teacherModel = require('../models/Teacher');
const redis = require('../utilities/redis');

exports.getAllSkill = async function (req, res, next) {
    try {
        let result = await skillModel.getAllSkill();

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

exports.getOneSkill = async function (req, res, next) {
    try {
        const result = await skillModel.getSkill(req.params.skillID);

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
        next(e);
    }
};

exports.createSkill = async function (req, res, next) {
    try {
        const newSkill = req.body;

        const result = await skillModel.createSkill(newSkill);
        if (result != null && result.affectedRows === 1) {
            redis.del('ALL_SKILL');
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

exports.updateSkill = async function (req, res, next) {
    const skillID = req.params.skillID;
    const newSkill = req.body;

    const result = await skillModel.updateSkill(skillID, newSkill);
    if (result != null && result.affectedRows === 1) {
        redis.del('ALL_SKILL');
        return res.json({
            returnCode: 1,
            returnMessage: "Success"
        });
    } else {
        next('error');
    }
};

exports.deleteSkill = async function (req, res, next) {
    try {
        const skillID = req.params.skillID;
        const skill = await skillModel.getSkill(skillID);

        const result = await skillModel.deleteSkill(skillID);
        if (result != null && result.affectedRows === 1) {
            redis.del('ALL_SKILL');

            const user = await teacherModel.getAllUser();
            if (user) {
                for (let u of user) {
                    const skills = JSON.parse(u.skills);
                    if (skills.includes(skill.skillName)) {
                        skills.splice(skills.indexOf(skill.skillName), 1);
                        const result2 = await teacherModel.deleteSkill(u.email, skills);
                        if (result2 == null || result2.affectedRows !== 1) {
                            next('error');
                        }
                        redis.del(`TEACHER_${u.email}`);
                    }
                }
                redis.del('ALL_TEACHER');
            }

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
