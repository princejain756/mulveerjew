const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function resetDatabase() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  };

  try {
    console.log('Connecting to MySQL...');
    const connection = await mysql.createConnection(config);

    console.log('Dropping existing database...');
    await connection.query('DROP DATABASE IF EXISTS mulveer_jewellers');

    console.log('Creating database...');
    await connection.query('CREATE DATABASE mulveer_jewellers');
    await connection.changeUser({ database: 'mulveer_jewellers' });

    console.log('Running schema...');
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    await connection.query(schema);

    console.log('Database reset successfully!');
    console.log('Default admin credentials:');
    console.log('Email: admin@mulveerjewellers.com');
    console.log('Password: admin123');

    await connection.end();
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();
