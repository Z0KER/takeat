'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class ProductInput extends Model {
        static associate(models) {
            ProductInput.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product',
            })
            ProductInput.belongsTo(models.Input, {
                foreignKey: 'inputId',
                as: 'input',
            })
        }
    }

    ProductInput.init(
        {
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            inputId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
        },
        {
            sequelize,
            modelName: 'ProductInput',
        },
    )

    return ProductInput
}
