const conn = require('../utilities/mysql');
const bcrypt = require('bcryptjs');

module.exports.getAllUser = async () => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM AdminUser')
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
        const obj = {};
        obj.email = row.email;
        obj.fullName = row.fullName;
        obj.phoneNumber = row.phoneNumber;
        obj.role = row.role;
        obj.status = row.status;

        result.push(obj);
    }

    return result;
};

module.exports.getUser = async (username) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM AdminUser WHERE email = ?', [username])
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
        email, password, fullName, phoneNumber, role, status
    } = res[0];

};

module.exports.createUser = async (user) => {

    const hash = bcrypt.hashSync(user.password, 8);
    const [res, f] = await conn.getConnection()
        .query('INSERT INTO AdminUser SET ?', {
            email: user.email,
            password: hash,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            role: 1,
            status: 1
        }).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.updateUser = async (email, user) => {

    let query = `UPDATE AdminUser SET fullName = '${user.fullName}', phoneNumber = '${user.phoneNumber}', status = '${user.status}' where email = '${email}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.changePassword = async (email, password) => {
    const hash = bcrypt.hashSync(password, 8);

    let query = `UPDATE AdminUser SET password = '${hash}' where email = '${email}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};
