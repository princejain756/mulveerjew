import mysql from 'mysql2/promise';

// Database configuration
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mulveer_jewellers',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
};

// Create connection pool
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// Helper function to execute queries
export async function query(sql: string, params: any[] = []): Promise<any> {
  const connection = await getPool().getConnection();
  try {
    // Use query() instead of execute() for better compatibility
    const [rows] = await connection.query(sql, params);
    return rows;
  } finally {
    connection.release();
  }
}

// Helper function for transactions
export async function transaction(callback: (connection: mysql.PoolConnection) => Promise<void>): Promise<void> {
  const connection = await getPool().getConnection();
  await connection.beginTransaction();

  try {
    await callback(connection);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
