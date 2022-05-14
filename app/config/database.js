require('dotenv').config();

const {
    DB_DEV_HOST,
    DB_DEV_DIALECT,
    DB_DEV_USERNAME,
    DB_DEV_PASSWORD,
    DB_DEV_DATABASE,
    DB_PROD_HOST,
    DB_PROD_DIALECT,
    DB_PROD_USERNAME,
    DB_PROD_PASSWORD,
    DB_PROD_DATABASE,
    DB_PROD_PORT,
} = process.env;

module.exports = {
    development: {
        username: DB_DEV_USERNAME,
        password: DB_DEV_PASSWORD,
        database: DB_DEV_DATABASE,
        host: DB_DEV_HOST,
        dialect: DB_DEV_DIALECT,
    },
    test: {
        username: 'root',
        password: null,
        database: 'bwa_db_toko_buku',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: DB_PROD_USERNAME,
        password: DB_PROD_PASSWORD,
        database: DB_PROD_DATABASE,
        host: DB_PROD_HOST,
        dialect: DB_PROD_DIALECT,
        port: DB_PROD_PORT,
        dialectOptions: {
            ssl: { rejectUnauthorized: false },
        },
    },
};
