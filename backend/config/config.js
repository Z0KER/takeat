require('dotenv').config({
    path: require('path').resolve(__dirname, '../.env'),
})

module.exports = {
    development: {
        username: process.env.DB_USER || 'restaurant_user',
        password: process.env.DB_PASS || 'senha',
        database: process.env.DB_NAME || 'restaurant_db',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    test: {
        username: process.env.DB_USER || 'restaurant_user',
        password: process.env.DB_PASS || 'senha',
        database: process.env.DB_NAME || 'restaurant_db',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
    },
}
