'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DetailTransaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    DetailTransaction.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            transactionId: {
                type: DataTypes.UUID,
                field: 'transaction_id',
            },
            userId: {
                type: DataTypes.UUID,
                field: 'user_id',
            },
            titleBook: {
                type: DataTypes.STRING,
                field: 'title_book',
            },
            imageBook: {
                type: DataTypes.TEXT,
                field: 'image_book',
            },
            priceBook: {
                type: DataTypes.INTEGER,
                field: 'price_book',
            },
            quantity: DataTypes.INTEGER,
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
            modelName: 'DetailTransaction',
            tableName: 'detail_transactions',
        }
    );
    return DetailTransaction;
};
