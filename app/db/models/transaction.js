'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Transaction.hasMany(models.DetailTransaction, {
                foreignKey: 'transactionId',
                as: 'detailTransactions',
            });
        }
    }
    Transaction.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            invoice: DataTypes.STRING,
            userId: {
                type: DataTypes.UUID,
                field: 'user_id',
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
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
            modelName: 'Transaction',
            tableName: 'transactions',
        }
    );
    return Transaction;
};
