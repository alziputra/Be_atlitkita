const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/authUtils");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Login User
 */
exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const userResult = await UserModel.getUserByUsernameOrEmail(usernameOrEmail);
    if (userResult.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan." });
    }

    const user = userResult[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Password salah." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    console.log("Login berhasil untuk pengguna:", user); // Log user saat berhasil login

    res.status(200).json({
      accessToken,
      refreshToken,
      message: "Login berhasil",
    });
  } catch (error) {
    console.error("Kesalahan saat login:", error); // Tambahkan log kesalahan
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

/**
 * Mendapatkan data pengguna berdasarkan token JWT
 */
exports.getMe = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("Token tidak ditemukan di header."); // Tambahkan log jika token tidak ada
      return res.status(401).json({ message: "Token tidak ada." });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log("Token tidak valid:", err.message); // Log kesalahan verifikasi token
        return res.status(403).json({ message: "Token tidak valid." });
      }

      const user = await UserModel.getUserById(decoded.id);
      if (!user || user.length === 0) {
        console.log("Pengguna tidak ditemukan dengan id:", decoded.id); // Log jika user tidak ditemukan
        return res.status(404).json({ message: "Pengguna tidak ditemukan." });
      }

      const { password, ...userData } = user[0];
      console.log("Data pengguna yang ditemukan:", userData); // Log user yang ditemukan
      return res.status(200).json(userData);
    });
  } catch (error) {
    console.error("Kesalahan server pada /users/me:", error); // Tambahkan log kesalahan server
    res.status(500).json({ message: "Terjadi kesalahan server." });
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
        delete user.password;
        return user;
      });
      handleSuccessResponse(res, sanitizedUsers, "Data pengguna berhasil diambil.");
    } else {
      handleSuccessResponse(res, [], "Tidak ada pengguna yang ditemukan.");
    }
  } catch (err) {
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
