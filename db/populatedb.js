const { Client } = require("pg")
require("dotenv").config()

const SQL = `
CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(225) NOT NULL UNIQUE,
  password VARCHAR(225) NOT NULL , 
  email VARCHAR(225) NOT NULL, 
  fullname VARCHAR(225) NOT NULL
);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(225) NOT NULL,
  message TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);
`

async function main(){
    console.log("seeding....")
    const client = new Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port:process.env.DB_PORT,
      ssl: {
        rejectUnauthorized: false, // Render requires SSL, skip cert validation
      },
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
main();