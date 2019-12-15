const complaintModel = require('../models/Complaint');
const contractModel = require('../models/Contract');
const redis = require('../utilities/redis');

exports.getAllComplaint = async function (req, res, next) {
    try {
        let result = await complaintModel.getAllComplaint();

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

exports.getOneComplaint = async function (req, res, next) {
    try {
        const result = await complaintModel.getComplaint(req.params.complaintID);

        if (!result) {
            return res.json({
                returnCode: -3,
                returnMessage: "Complaint Not Found"
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

exports.updateComplaint = async function (req, res, next) {
    try {
        const complaintID = req.params.complaintID;
        const newStatus = req.body.status;

        const complaint = await complaintModel.getComplaint(complaintID);
        if (!complaint){
            next('error');
        }

        const result = await complaintModel.updateStatus(complaintID, newStatus);

        if (result != null && result.affectedRows === 1) {
            redis.del(`COMPLAINT_${complaintID}`);
            redis.del(`COMPLAINT_BY_CONTRACT_${complaint.contractID}`);

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

exports.getChatHistory = async function (req, res, next) {
    try {
        // const result = await complaintModel.getComplaint(req.params.complaintID);
        //
        // if (!result) {
        //     return res.json({
        //         returnCode: -3,
        //         returnMessage: "Complaint Not Found"
        //     });
        // }
        //
        // const contract = await contractModel.getContract(result.contractID);
        //
        // if (!contract) {
        //     next('contract error');
        // }
        //
        // const {teacherEmail, studentEmail} = contract;
        const fakeData = [
            {
                "timestamp":"2019-12-15 15:08:00",
                "sender":2,
                "message":"hello teacher"
            },
            {
                "timestamp":"2019-12-15 15:08:30",
                "sender":1,
                "message":"hi student "
            },
            {
                "timestamp":"2019-12-15 15:09:00",
                "sender":2,
                "message":"test"
            },
            {
                "timestamp":"2019-12-15 15:10:00",
                "sender":1,
                "message":"test 2"
            }
        ];


        return res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: fakeData
        })
    } catch (e) {
        next(e);
    }
};
