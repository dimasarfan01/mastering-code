const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const errorController = require('./app/api/error/controller');

const routes = [
    {
        path: 'auth',
        router: require('./app/api/auth/router'),
    },
    {
        path: 'category',
        router: require('./app/api/categories/router'),
    },
    {
        path: 'book',
        router: require('./app/api/books/router'),
    },
    {
        path: 'transaction',
        router: require('./app/api/transactions/router'),
    },
];

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes.forEach(({ path, router }) => app.use(`/v1/${path}`, router));

app.use('*', errorController.unknownUrl);
app.use(errorController.internetServerError);
app.use(errorController.logErrors);
app.use(errorController.errorHandler);

module.exports = app;
