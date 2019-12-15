const contractModel = require('../models/Contract');
const redis = require('../utilities/redis');

exports.getAllContract = async function (req, res, next) {
    try {
        let result = await contractModel.getAllContract();

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

exports.getOneContract = async function (req, res, next) {
    try {
        const result = await contractModel.getContract(req.params.contractID);

        if (!result) {
            return res.json({
                returnCode: -3,
                returnMessage: "Contract Not Found"
            });
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

exports.updateContract = async function (req, res, next) {
    try {
        const contractID = req.params.contractID;
        const newStatus = req.body.status;

        const contract = await contractModel.getContract(contractID);
        if (!contract){
            next('error');
        }

        const result = await contractModel.updateStatus(contractID, newStatus);

        if (result != null && result.affectedRows === 1) {
            redis.del('ALL_CONTRACT');
            redis.del(`CONTRACT_${contractID}`);
            redis.del(`CONTRACT_BY_TEACHER_${contract.teacherEmail}`);
            redis.del(`CONTRACT_BY_STUDENT_${contract.studentEmail}`);

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
