const conn = require('../utilities/mysql');
const bcrypt = require('bcryptjs');

module.exports.getAllSkill = async () => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM Skill WHERE isDeleted = ?', [0])
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
        obj.skillID = row.skillID;
        obj.skillName = row.skillName;

        result.push(obj);
    }

    return result;
};

module.exports.getSkill = async (skillID) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM Skill WHERE skillID = ? AND isDeleted = ?', [skillID, 0])
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    return { skillID, skillName } = res[0];

};

module.exports.createSkill = async (skill) => {

    const [res, f] = await conn.getConnection()
        .query('INSERT INTO Skill SET ?', {
            skillName : skill.skillName,
            isDeleted : 0
        }).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.updateSkill = async (skillID, skill) => {

    let query = `UPDATE Skill SET skillName = '${skill.skillName}' where skillID = ${skillID}`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.deleteSkill = async (skillID) => {

    let query = `UPDATE Skill SET isDeleted = 1 where skillID = ${skillID}`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};
