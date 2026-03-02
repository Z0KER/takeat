'use strict'

const now = new Date()

// IDs dos Inputs:
// 1 = Pão de Hambúrguer
// 2 = Carne Bovina 150g
// 3 = Queijo Cheddar
// 4 = Alface
// 5 = Tomate
// 6 = Bacon
// 7 = Frango Grelhado 150g
// 8 = Molho Especial
// 9 = Maionese

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('ProductInputs', [
            // X-Burger (productId: 1)
            // Pão
            {
                productId: 1,
                inputId: 1,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // Carne
            {
                productId: 1,
                inputId: 2,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // Queijo
            {
                productId: 1,
                inputId: 3,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // Molho
            {
                productId: 1,
                inputId: 8,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },

            // X-Bacon (productId: 2)
            // Pão
            {
                productId: 2,
                inputId: 1,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // Carne
            {
                productId: 2,
                inputId: 2,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // Queijo
            {
                productId: 2,
                inputId: 3,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // 2 Bacon
            {
                productId: 2,
                inputId: 6,
                quantity: 2,
                createdAt: now,
                updatedAt: now,
            },
            // Molho
            {
                productId: 2,
                inputId: 8,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },

            // X-Frango (productId: 3)
            // Pão
            {
                productId: 3,
                inputId: 1,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // Frango
            {
                productId: 3,
                inputId: 7,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // Queijo
            {
                productId: 3,
                inputId: 3,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // 2 Alface
            {
                productId: 3,
                inputId: 4,
                quantity: 2,
                createdAt: now,
                updatedAt: now,
            },
            // Maionese
            {
                productId: 3,
                inputId: 9,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },

            // X-Salada (productId: 4)
            // Pão
            {
                productId: 4,
                inputId: 1,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // Carne
            {
                productId: 4,
                inputId: 2,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // Queijo
            {
                productId: 4,
                inputId: 3,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
            // 2 Alface
            {
                productId: 4,
                inputId: 4,
                quantity: 2,
                createdAt: now,
                updatedAt: now,
            },
            // 2 Tomate
            {
                productId: 4,
                inputId: 5,
                quantity: 2,
                createdAt: now,
                updatedAt: now,
            },
            // Maionese
            {
                productId: 4,
                inputId: 9,
                quantity: 1,
                createdAt: now,
                updatedAt: now,
            },
        ])
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('ProductInputs', null, {})
    },
}
