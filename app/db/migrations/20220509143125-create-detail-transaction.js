'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('detail_transactions', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            transactionId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'transactions',
                    key: 'id',
                },
                field: 'transaction_id',
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
                field: 'user_id',
            },
            titleBook: {
                allowNull: false,
                type: Sequelize.STRING,
                field: 'title_book',
            },
            imageBook: {
                allowNull: false,
                type: Sequelize.STRING,
                field: 'image_book',
            },
            priceBook: {
                allowNull: false,
                type: Sequelize.INTEGER,
                field: 'price_book',
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'created_at',
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'updated_at',
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('detail_transactions');
    },
};
