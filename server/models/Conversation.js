const conn = require('../utilities/mysql');

module.exports.getConversationID = async (teacherEmail, studentEmail) => {

    const [res, f] = await conn.getConnection()
        .query(`SELECT conversationID FROM Conversation WHERE studentEmail = '${studentEmail}' AND teacherEmail = '${teacherEmail}' ORDER BY conversationID DESC LIMIT 1`)
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    return res[0].conversationID;
};

module.exports.getMessages = async (conversationID) => {
    const [res, f] = await conn.getConnection()
        .query(`SELECT * FROM Message WHERE conversationID = ${conversationID}`)
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
        result.push(obj);
    }

    return result;
};
