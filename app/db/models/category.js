'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Category.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: DataTypes.STRING,
            userId: {
                type: DataTypes.UUID,
                field: 'user_id',
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
            modelName: 'Category',
            tableName: 'categories',
        }
    );
    return Category;
};
