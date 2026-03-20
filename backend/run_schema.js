const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function runSchema() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true
    });

    const schema = fs.readFileSync('schema.sql', 'utf8');
    await connection.query(schema);
    console.log('Schema executed successfully!');
    await connection.end();
  } catch (err) {
    console.error('Migration error:', err.message);
  }
}

runSchema();
