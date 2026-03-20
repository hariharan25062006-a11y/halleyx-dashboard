const db = require('../config/db');

const createUser = async ({ full_name, email, hashedPassword, avatarColor }) => {
  const [result] = await db.execute(
    'INSERT INTO users (full_name, email, password, avatar_color) VALUES (?, ?, ?, ?)',
    [full_name, email, hashedPassword, avatarColor || '#6C47FF']
  );
  return result;
};

const findByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT id, full_name, email, password, avatar_color, created_at FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

const findById = async (id) => {
  const [rows] = await db.execute(
    'SELECT id, full_name, email, avatar_color, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
};

module.exports = { createUser, findByEmail, findById };
