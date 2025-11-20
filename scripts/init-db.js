const mysql = require('mysql2/promise');
const mysqlLib = require('mysql2');
const fs = require('fs');
const path = require('path');

function buildQualifiedUser(user, host) {
  return mysqlLib.format('?@?', [user, host]);
}

async function initializeDatabase() {
  const dbHost = process.env.DB_HOST || 'localhost';
  const databaseName = process.env.DB_NAME || 'mulveer_jewellers';
  const appUser = process.env.DB_USER || 'root';
  const appPassword = process.env.DB_PASSWORD || '';
  const appHost = process.env.DB_USER_HOST || 'localhost';
  const adminUser = process.env.DB_ROOT_USER || appUser || 'root';
  const adminPassword =
    process.env.DB_ROOT_PASSWORD !== undefined
      ? process.env.DB_ROOT_PASSWORD
      : appPassword;

  const config = {
    host: dbHost,
    user: adminUser,
    password: adminPassword,
    multipleStatements: true,
  };

  try {
    console.log('Connecting to MySQL...');
    const connection = await mysql.createConnection(config);

    console.log('Creating database...');
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${mysqlLib.escapeId(databaseName)}`,
    );
    await connection.changeUser({ database: databaseName });

    console.log('Running schema...');
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    await connection.query(schema);

    const shouldProvisionAppUser =
      !!appUser && (appUser !== adminUser || process.env.DB_ROOT_USER || process.env.DB_ROOT_PASSWORD);

    if (shouldProvisionAppUser) {
      const qualifiedUser = buildQualifiedUser(appUser, appHost);
      console.log(`Ensuring application user ${qualifiedUser} exists...`);

      await connection.query(
        `CREATE USER IF NOT EXISTS ${qualifiedUser} IDENTIFIED WITH mysql_native_password BY ${mysqlLib.escape(
          appPassword,
        )}`,
      );
      await connection.query(
        `ALTER USER ${qualifiedUser} IDENTIFIED WITH mysql_native_password BY ${mysqlLib.escape(
          appPassword,
        )}`,
      );

      console.log(`Granting privileges on ${databaseName}...`);
      await connection.query(
        `GRANT ALL PRIVILEGES ON ${mysqlLib.escapeId(databaseName)}.* TO ${qualifiedUser}`,
      );
      await connection.query('FLUSH PRIVILEGES');
    } else {
      console.log('Skipping app user provisioning (using admin credentials directly).');
    }

    console.log('Database initialized successfully!');
    console.log('Default admin credentials:');
    console.log('Email: admin@mulveerjewellers.com');
    console.log('Password: (check schema.sql for hashed password)');

    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
