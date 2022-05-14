const { jwtSecret } = require('../config');
const { ErrorMessage } = require('../utils');

const ROLE = {
    ADMIN: 'admin',
    KASIR: 'kasir',
};

const accessRoute = ({ accessRole }) => {
    return (req, res, next) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = require('jsonwebtoken').verify(token, jwtSecret);
            req.user = decoded;

            switch (accessRole) {
                case ROLE.ADMIN:
                    if (decoded.role === ROLE.ADMIN) return next();
                    break;
                case ROLE.KASIR:
                    if ([ROLE.ADMIN, ROLE.KASIR].includes(decoded.role)) return next();
                    break;
                default:
                    break;
            }

            throw new ErrorMessage({
                message: 'Access denied',
                statusCode: 401,
                data: { role: decoded.role },
            });
        }

        throw new ErrorMessage({
            message: 'Token is not provided',
            statusCode: 401,
        });
    };
};

module.exports = { accessRoute, ROLE };
