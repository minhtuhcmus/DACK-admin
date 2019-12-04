const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateToken = (req, res, next) => {
    passport.authenticate('jwt', {
        session: false
    }, async (err, user, info) => {
        try {
            if (err || !user) {
                return res.json({
                    returnCode: -1,
                    returnMessage: "JWT Not Valid."
                });
            }

            next();

        } catch (e) {
            console.error(e);
            return res.json({
                returnCode: 0,
                returnMessage: "Exception. Retry Later."
            });
        }
    })(req, res, next);
};

module.exports = {
    validateToken: validateToken
};
