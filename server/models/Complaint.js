const conn = require('../utilities/mysql');

module.exports.getAllComplaint = async () => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM Complaint')
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    const result = [];

    for (let row of res) {
        const obj = {...row};
        delete obj.updDate;
        result.push(obj);
    }

    return result;
};

module.exports.getComplaint = async (complaintID) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM Complaint WHERE complaintID = ?', [complaintID])
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    return res[0];
};

module.exports.updateStatus = async (complaintID, status) => {

    let query = `UPDATE Complaint SET status = '${status}'where complaintID = '${complaintID}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};
