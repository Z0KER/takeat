'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.ProductInput, {
                foreignKey: 'productId',
                as: 'productInputs',
            })
            Product.belongsToMany(models.Input, {
                through: models.ProductInput,
                foreignKey: 'productId',
                otherKey: 'inputId',
                as: 'inputs',
            })
            Product.hasMany(models.OrderItem, {
                foreignKey: 'productId',
                as: 'orderItems',
            })
        }
    }

    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Product',
        },
    )

    return Product
}
