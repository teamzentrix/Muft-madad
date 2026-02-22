const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'MuftMadad',
    password: process.env.DB_PASSWORD,
    port: 5432,
})

pool.on('connect', () => {
    console.log("the database connected successfully ")
})
pool.on('error', () => {
    console.log('the error is occur at db.js file ', err);
})

module.exports = pool;