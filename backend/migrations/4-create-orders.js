'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.ENUM(
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
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },

    async down(queryInterface) {
        await queryInterface.dropTable('Orders')
    },
}
