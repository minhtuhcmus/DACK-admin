const conn = require('../utilities/mysql');
const bcrypt = require('bcryptjs');

module.exports.getAllUser = async () => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM User')
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
        delete obj.password;
        delete obj.updDate;
        result.push(obj);
    }

    return result;
};

module.exports.getUser = async (email) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM User WHERE email = ?', [email])
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    return {
        email, fullName, phoneNumber, address, avatar, type , status
    } = res[0];

};

module.exports.updateUser = async (email, status) => {

    let query = `UPDATE User SET status = '${status}'where email = '${email}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};
