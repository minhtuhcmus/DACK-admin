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
        obj.username = row.username;
        obj.fullName = row.fullName;
        obj.email = row.email;
        obj.phoneNumber = row.phoneNumber;
        obj.role = row.role;
        obj.status = row.status;

        result.push(obj);
    }

    return result;
};

module.exports.getUser = async (username) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM AdminUser WHERE username = ?', [username])
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res[0])
        return null;

    return {
        username, password, fullName, email, phoneNumber, role, status
    } = res[0];

};

module.exports.createUser = async (user) => {

    const hash = bcrypt.hashSync(user.password, 8);
    const [res, f] = await conn.getConnection()
        .query('INSERT INTO AdminUser SET ?', {
            username: user.username,
            password: hash,
            email: user.email,
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

module.exports.updateUser = async (username, user) => {

    let query = `UPDATE AdminUser SET email = '${user.email}', fullName = '${user.fullName}', phoneNumber = '${user.phoneNumber}', status = '${user.status}' where username = '${username}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.changePassword = async (username, password) => {
    const hash = bcrypt.hashSync(password, 8);

    let query = `UPDATE AdminUser SET password = '${hash}' where username = '${username}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};
