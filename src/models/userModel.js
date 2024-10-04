const db = require("../config/db");
const bcrypt = require("bcrypt");

// Wrapper untuk query database menggunakan Promise
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mendapatkan pengguna berdasarkan username
exports.getUserByUsername = async (username) => {
  try {
    const sql = `
      SELECT users.*, roles.role_name 
      FROM tb_users AS users
      JOIN tb_roles AS roles ON users.role_id = roles.role_id
      WHERE users.username = ?
    `;

    const result = await query(sql, [username]);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan pengguna berdasarkan username.");
  }
};

// Mendapatkan semua pengguna
exports.getAllUsers = async () => {
  try {
    const sql = `
      SELECT users.*, roles.role_name 
      FROM tb_users AS users
      JOIN tb_roles AS roles ON users.role_id = roles.role_id
    `;

    const result = await query(sql, []);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan semua data pengguna.");
  }
};

// Mendapatkan pengguna berdasarkan ID
exports.getUserById = async (userId) => {
  try {
    const sql = `
      SELECT users.*, roles.role_name 
      FROM tb_users AS users
      JOIN tb_roles AS roles ON users.role_id = roles.role_id
      WHERE users.user_id = ?
    `;

    const result = await query(sql, [userId]);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan pengguna berdasarkan ID.");
  }
};

// Membuat pengguna baru
exports.createUser = async (userData) => {
  try {
    const { name, email, username, password, role_id } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Periksa apakah username sudah ada
    const existingUser = await this.getUserByUsername(username);
    if (existingUser.length > 0) {
      throw new Error("Pengguna sudah ada.");
    }

    const sql = `
      INSERT INTO tb_users (name, email, username, password, role_id) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [name, email, username, hashedPassword, role_id]);
    return result;
  } catch (err) {
    throw new Error("Gagal membuat pengguna baru.");
  }
};

// Memperbarui pengguna berdasarkan ID
exports.updateUser = async (userId, userData) => {
  try {
    const { name, email, username, password, role_id } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Periksa apakah pengguna ada berdasarkan ID
    const existingUser = await this.getUserById(userId);
    if (existingUser.length === 0) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    const sql = `
      UPDATE tb_users 
      SET name = ?, email = ?, username = ?, password = ?, role_id = ? 
      WHERE user_id = ?
    `;

    const result = await query(sql, [name, email, username, hashedPassword, role_id, userId]);
    return result;
  } catch (err) {
    throw new Error("Gagal memperbarui data pengguna.");
  }
};

// Menghapus pengguna berdasarkan ID
exports.deleteUser = async (userId) => {
  try {
    const sql = `DELETE FROM tb_users WHERE user_id = ?`;
    const result = await query(sql, [userId]);
    return result;
  } catch (err) {
    throw new Error("Gagal menghapus pengguna.");
  }
};
