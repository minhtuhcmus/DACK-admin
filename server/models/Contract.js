const conn = require('../utilities/mysql');

module.exports.getAllContract = async () => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM Contract')
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
        obj.teachingTimes = JSON.parse(obj.teachingTimes);
        result.push(obj);
    }

    return result;
};

module.exports.getContract = async (contractID) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM Contract WHERE contractID = ?', [contractID])
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    res[0].teachingTimes = JSON.parse(res[0].teachingTimes);
    return res[0];
};

module.exports.updateStatus = async (contractID, status) => {

    let query = `UPDATE Contract SET status = '${status}'where contractID = '${contractID}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};
