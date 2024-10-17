const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/authUtils");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Login User
 */
exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    // Cari pengguna berdasarkan username atau email
    const userResult = await UserModel.getUserByUsernameOrEmail(usernameOrEmail);
    if (userResult.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan." });
    }

    const user = userResult[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Jika password tidak cocok
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password salah." });
    }

    // Generate token
    const Token = generateToken(user);

    // Kirim response sukses
    return res.status(200).json({
      status: "success",
      message: "Login berhasil.",
      Token,
    });
  } catch (error) {
    console.error("Kesalahan saat login:", error); // Tambahkan log kesalahan
    handleErrorResponse(res, 500, "Terjadi kesalahan saat login.");
  }
};

/**
 * Get all users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    if (users.length > 0) {
      // Hapus password dari setiap user sebelum dikembalikan
      const sanitizedUsers = users.map((user) => {
        delete user.password; // Hapus password untuk keamanan
        return user;
      });
      handleSuccessResponse(res, sanitizedUsers, "Data pengguna berhasil diambil.");
    } else {
      handleSuccessResponse(res, [], "Tidak ada pengguna yang ditemukan.");
    }
  } catch (err) {
    console.error("Kesalahan saat mengambil data pengguna:", err);
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data pengguna.");
  }
};

/**
 * Get user by ID
 */
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.getUserById(userId);
    if (user.length === 0) {
      return handleErrorResponse(res, 404, "User tidak ditemukan.");
    }
    // Hapus password sebelum dikembalikan
    delete user[0].password;
    handleSuccessResponse(res, user[0], "Data pengguna berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data pengguna.");
  }
};

/**
 * Create new user
 */
exports.createUser = async (req, res) => {
  const { name, email, username, password, role_id } = req.body; // Menggunakan role_id

  // Validasi input
  if (!name || !email || !username || !password || !role_id) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    // Pastikan user belum ada
    const existingUser = await UserModel.getUserByUsername(username);
    if (existingUser.length > 0) {
      return handleErrorResponse(res, 409, "Username sudah digunakan.");
    }

    const newUser = await UserModel.createUser({ name, email, username, password, role_id });

    // Hindari mengembalikan password dalam response
    const { user_id, created_at } = newUser;

    handleSuccessResponse(res, { user_id, name, email, username, role_id, created_at }, "User berhasil ditambahkan.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan user.");
  }
};

/**
 * Update user by ID
 */
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, username, password, role_id } = req.body; // Menggunakan role_id

  // Validasi input
  if (!name || !email || !username || !password || !role_id) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const user = await UserModel.getUserById(userId);
    if (user.length === 0) {
      return handleErrorResponse(res, 404, "User tidak ditemukan.");
    }

    await UserModel.updateUser(userId, { name, email, username, password, role_id });

    handleSuccessResponse(
      res,
      {
        id: userId,
        name,
        email,
        username,
        role_id,
        updated_at: new Date().toISOString(),
      },
      "User berhasil diperbarui."
    );
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat memperbarui user.");
  }
};

/**
 * Delete user by ID
 */
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await UserModel.deleteUser(userId);
    if (result.affectedRows === 0) {
      return handleErrorResponse(res, 404, "User tidak ditemukan.");
    }
    handleSuccessResponse(res, null, "User berhasil dihapus.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menghapus user.");
  }
};
