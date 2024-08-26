const db = require("../config/db");
// Import bcrypt from the bcrypt package
const bcrypt = require("bcrypt");

// Export the functions to be used in the controller
exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_users";
    db.query(sql, [], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get user by ID
exports.getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_users WHERE user_id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Get user by username
exports.getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_users WHERE username = ?";
    db.query(sql, [username], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Create new user
exports.createUser = async (userData) => {
  const { username, password, role } = userData;

  // Encrypt the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO tb_users (username, password, role) VALUES (?, ?, ?)";
    db.query(sql, [username, hashedPassword, role], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Update user
exports.updateUser = async (userId, userData) => {
  const { username, password, role } = userData;

  // Encrypt the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    const sql = "UPDATE tb_users SET username = ?, password = ?, role = ? WHERE user_id = ?";
    db.query(sql, [username, hashedPassword, role, userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete user
exports.deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM tb_users WHERE user_id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
