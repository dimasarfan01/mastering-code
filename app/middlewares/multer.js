const multer = require('multer');
const { ErrorMessage } = require('../utils');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
    },
});

const supportedFiles = ['image/jpeg', 'image/png'];

const fileFilter = (req, file, cb) => {
    if (supportedFiles.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new ErrorMessage({
                message: 'File type not supported',
                statusCode: 400,
                data: { file },
            }),
            false
        );
    }
};

const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 3000000,
    },
    fileFilter,
});

module.exports = uploadMiddleware;
