'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Book.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                as: 'category',
            });
        }
    }
    Book.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            title: DataTypes.STRING,
            userId: {
                type: DataTypes.UUID,
                field: 'user_id',
            },
            categoryId: {
                type: DataTypes.UUID,
                field: 'category_id',
            },
            author: DataTypes.STRING,
            image: DataTypes.TEXT,
            published: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            price: DataTypes.INTEGER,
            stock: DataTypes.INTEGER,
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at',
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Book',
            tableName: 'books',
        }
    );
    return Book;
};
