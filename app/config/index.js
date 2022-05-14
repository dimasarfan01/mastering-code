require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    appUrl: process.env.APP_URL,
    uploadPath: 'public/uploads',
};
