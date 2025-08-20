const { Pool } = require("pg")
require("dotenv").config()

module.exports = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port:process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Render requires SSL, skip cert validation
  },
})