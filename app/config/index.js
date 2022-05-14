require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    appUrl: process.env.APP_URL || 'http://localhost:3000',
    nodeEnv: process.env.NODE_ENV || 'development',
    uploadPath: 'public/uploads',
};
