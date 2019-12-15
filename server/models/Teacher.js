const conn = require('../utilities/mysql');

module.exports.getAllUser = async () => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM Teacher')
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

module.exports.deleteSkill = async (email, skills) => {

    let query = `UPDATE Teacher SET skills = '${JSON.stringify(skills)}'where email = '${email}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};
