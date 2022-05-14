module.exports = {
    unknownUrl(req, res) {
        res.status(404).send({
            code: 404,
            status: 'NotFound',
            message: 'Resource url tidak ditemukan',
        });
    },
    internetServerError(req, res, next) {
        next(new Error('Internet Server Error'));
    },
    logErrors(err, req, res, next) {
        process.stdout.write(
            '\n----------------------------------------ERROR----------------------------------------\n'
        );
        console.error(err);
        process.stdout.write(
            '----------------------------------------ERROR----------------------------------------\n\n'
        );
        next(err);
    },
    errorHandler(err, req, res, next) {
        if (req.file) require('fs').unlinkSync(req.file.path);

        const errorCode = err.isJoi === true ? 400 : err.status || 500;
        res.status(errorCode).send({
            code: errorCode,
            status: err.name || 'Error',
            message: err.message || 'Resource tidak ditemukan, atau endpoint tidak ada',
            data: err.data || null,
        });
    },
};
