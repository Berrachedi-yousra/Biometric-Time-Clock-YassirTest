const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({    
    user:'postgres',
    password:'admin',
    host:'localhost',
    port: 5432,
    database: 'biometricTimeClock',
})

module.exports = pool