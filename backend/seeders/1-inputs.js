'use strict'

const now = new Date()

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Inputs', [
            {
                name: 'Pão de Hambúrguer',
                unit: 'un',
                stock: 50,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Carne Bovina 150g',
                unit: 'un',
                stock: 40,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Queijo Cheddar',
                unit: 'fatia',
                stock: 60,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Alface',
                unit: 'folha',
                stock: 80,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Tomate',
                unit: 'fatia',
                stock: 70,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Bacon',
                unit: 'fatia',
                stock: 30,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Frango Grelhado 150g',
                unit: 'un',
                stock: 25,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Molho Especial',
                unit: 'porção',
                stock: 100,
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Maionese',
                unit: 'porção',
                stock: 90,
                createdAt: now,
                updatedAt: now,
            },
        ])
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Inputs', null, {})
    },
}
