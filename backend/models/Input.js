'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Input extends Model {
        static associate(models) {
            Input.hasMany(models.ProductInput, {
                foreignKey: 'inputId',
                as: 'productInputs',
            })
            Input.belongsToMany(models.Product, {
                through: models.ProductInput,
                foreignKey: 'inputId',
                otherKey: 'productId',
                as: 'products',
            })
        }
    }

    Input.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            unit: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'un',
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Input',
        },
    )

    return Input
}
