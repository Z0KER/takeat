'use strict'

const now = new Date()

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Products', [
            {
                name: 'X-Burger',
                price: 22.9,
                description: 'Pão, carne, queijo e molho especial',
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'X-Bacon',
                price: 27.9,
                description: 'Pão, carne, queijo, bacon e molho especial',
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'X-Frango',
                price: 24.9,
                description: 'Pão, frango grelhado, queijo, alface e maionese',
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'X-Salada',
                price: 25.9,
                description: 'Pão, carne, queijo, alface, tomate e maionese',
                createdAt: now,
                updatedAt: now,
            },
        ])
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Products', null, {})
    },
}
