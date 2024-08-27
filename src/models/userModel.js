const db = require("../config/db");
const bcrypt = require("bcrypt");

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.getAllUsers = () => {
  const sql = "SELECT * FROM tb_users";
  return query(sql, []);
};

exports.getUserById = (userId) => {
  const sql = "SELECT * FROM tb_users WHERE user_id = ?";
  return query(sql, [userId]);
};

exports.getUserByUsername = (username) => {
  const sql = "SELECT * FROM tb_users WHERE username = ?";
  return query(sql, [username]);
};

exports.createUser = async (userData) => {
  const { name, email, username, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await this.getUserByUsername(username);
  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  const sql = "INSERT INTO tb_users (name, email, username, password, role) VALUES (?, ?, ?, ?, ?)";
  return query(sql, [name, email, username, hashedPassword, role]);
};

exports.updateUser = async (userId, userData) => {
  const { name, email, username, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await this.getUserById(userId);
  if (existingUser.length === 0) {
    throw new Error("User not found");
  }

  const sql = "UPDATE tb_users SET name = ?, email = ?, username = ?, password = ?, role = ? WHERE user_id = ?";
  return query(sql, [name, email, username, hashedPassword, role, userId]);
};

exports.deleteUser = async (userId) => {
  // First, check if the user exists
  const user = await this.getUserById(userId);
  if (user.length === 0) {
    throw new Error("User not found");
  }

  const sql = "DELETE FROM tb_users WHERE user_id = ?";
  return query(sql, [userId]);
};
