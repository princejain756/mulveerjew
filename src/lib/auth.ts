import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT tokens
export function generateTokens(user: User): AuthTokens {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Create user
export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'customer' | 'admin';
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}): Promise<UserWithPassword> {
  const hashedPassword = await hashPassword(userData.password);

  const sql = `
    INSERT INTO users (name, email, password, phone, role, address, city, state, pincode)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    userData.name,
    userData.email,
    hashedPassword,
    userData.phone || null,
    userData.role || 'customer',
    userData.address || null,
    userData.city || null,
    userData.state || null,
    userData.pincode || null,
  ];

  const result = await query(sql, values);
  const userId = result.insertId;

  // Fetch the created user
  const users = await query('SELECT * FROM users WHERE id = ?', [userId]);
  return users[0] as UserWithPassword;
}

// Authenticate user
export async function authenticateUser(email: string, password: string): Promise<UserWithPassword | null> {
  const users = await query('SELECT * FROM users WHERE email = ?', [email]);

  if (!users || users.length === 0) {
    return null;
  }

  const user = users[0];
  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  return user as UserWithPassword;
}

// Get user by ID
export async function getUserById(id: number): Promise<User | null> {
  const users = await query('SELECT * FROM users WHERE id = ?', [id]);
  return users && users.length > 0 ? (users[0] as User) : null;
}

// Update user
export async function updateUser(id: number, updates: Partial<User>): Promise<boolean> {
  const fields = [];
  const values = [];

  if (updates.name) {
    fields.push('name = ?');
    values.push(updates.name);
  }
  if (updates.phone) {
    fields.push('phone = ?');
    values.push(updates.phone);
  }
  if (updates.address) {
    fields.push('address = ?');
    values.push(updates.address);
  }
  if (updates.city) {
    fields.push('city = ?');
    values.push(updates.city);
  }
  if (updates.state) {
    fields.push('state = ?');
    values.push(updates.state);
  }
  if (updates.pincode) {
    fields.push('pincode = ?');
    values.push(updates.pincode);
  }

  if (fields.length === 0) {
    return false;
  }

  values.push(id);
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  await query(sql, values);
  return true;
}