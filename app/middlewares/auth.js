const { jwtSecret } = require('../config');
const { ErrorMessage } = require('../utils');

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = require('jsonwebtoken').verify(token, jwtSecret);
        req.user = decoded;

        next();
    } else {
        next(
            new ErrorMessage({
                message: 'Token is not provided',
                statusCode: 401,
            })
        );
    }
};
