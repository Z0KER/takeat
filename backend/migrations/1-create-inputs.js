'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Inputs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            unit: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'un',
            },
            stock: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Inputs')
    },
}
