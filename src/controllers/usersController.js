const UserModel = require("../models/userModel");

const handleSuccessResponse = (res, data = null, message = null) => {
  if (message) {
    res.status(200).json({ message, data });
  } else if (data) {
    res.status(200).json(data);
  } else {
    res.sendStatus(204);
  }
};

const handleErrorResponse = (res, statusCode, errorMessage) => {
  res.status(statusCode).json({ error: errorMessage });
};

// Mendapatkan semua user
exports.getAllUsers = (req, res) => {
  UserModel.getAllUsers()
    .then((users) => handleSuccessResponse(res, users))
    .catch((err) => handleErrorResponse(res, 500, "Internal server error"));
};

// Mendapatkan user berdasarkan ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  UserModel.getUserById(userId)
    .then((user) => {
      if (user.length === 0) {
        return handleErrorResponse(res, 404, "User not found");
      }
      handleSuccessResponse(res, user[0]);
    })
    .catch((err) => handleErrorResponse(res, 500, "Internal server error"));
};

// Mendapatkan user saat ini (untuk endpoint /me)
exports.getCurrentUser = (req, res) => {
  const userId = req.user.id; // userId diambil dari JWT yang sudah diverifikasi oleh middleware

  UserModel.getUserById(userId)
    .then((user) => {
      if (user.length === 0) {
        return handleErrorResponse(res, 404, "User not found");
      }
      handleSuccessResponse(res, user[0]);
    })
    .catch((err) => handleErrorResponse(res, 500, "Internal server error"));
};

// Membuat user baru
exports.createUser = (req, res) => {
  const { name, email, username, password, role } = req.body;
  if (!name || !email || !username || !password || !role) {
    return handleErrorResponse(res, 400, "Missing required fields");
  }

  UserModel.createUser({ name, email, username, password, role })
    .then((result) => handleSuccessResponse(res, { id: result.insertId }, "User created successfully"))
    .catch((err) => handleErrorResponse(res, 409, "User already exists"));
};

// Mengupdate user
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email, username, password, role } = req.body;
  if (!name || !email || !username || !password || !role) {
    return handleErrorResponse(res, 400, "Missing required fields");
  }

  UserModel.updateUser(userId, { name, email, username, password, role })
    .then((result) => {
      if (result.affectedRows === 0) {
        return handleErrorResponse(res, 404, "User not found");
      }
      handleSuccessResponse(res, null, "User updated successfully");
    })
    .catch((err) => handleErrorResponse(res, 500, "Internal server error"));
};

// Menghapus user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  UserModel.deleteUser(userId)
    .then((result) => {
      if (result.affectedRows === 0) {
        return handleErrorResponse(res, 404, "User not found");
      }
      handleSuccessResponse(res, null, "User deleted successfully");
    })
    .catch((err) => handleErrorResponse(res, 500, "Internal server error"));
};
