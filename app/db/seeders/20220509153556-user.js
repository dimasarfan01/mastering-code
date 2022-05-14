'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const password = require('bcryptjs').hashSync('password', 10);
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    id: Sequelize.UUIDV4,
                    name: 'John Doe',
                    email: 'admin@gmail.com',
                    password,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
