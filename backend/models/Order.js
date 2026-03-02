'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.hasMany(models.OrderItem, {
                foreignKey: 'orderId',
                as: 'items',
            })
        }
    }

    Order.init(
        {
            status: {
                type: DataTypes.ENUM(
                    'pending',
                    'confirmed',
                    'preparing',
                    'delivered',
                    'cancelled',
                ),
                allowNull: false,
                defaultValue: 'confirmed',
            },
            total: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Order',
        },
    )

    return Order
}
