module.exports = class ErrorMessage extends Error {
    constructor({ message, statusCode, name, data }) {
        super(message);
        this.status = statusCode || 500;
        this.name = name || 'Error';
        this.data = data || {};
    }
};
