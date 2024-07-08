const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
    {
      user: process.env.POST_USER,
      password: process.env.POST_PASS,
      host: 'localhost',
      database: process.env.POST_DB
    },
    console.log(`Connected to the employee_manager_db database.`)
)

module.exports = pool;