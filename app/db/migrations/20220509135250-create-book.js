'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('books', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
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
            categoryId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'categories',
                    key: 'id',
                },
                field: 'category_id',
            },
            author: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            published: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            stock: {
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
        await queryInterface.dropTable('books');
    },
};
