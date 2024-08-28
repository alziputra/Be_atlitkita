const UserModel = require("../models/userModel");
const generateToken = require("../utils/jwt");

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

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return handleErrorResponse(res, 400, "Username and password are required");
  }

  UserModel.loginUser(username, password)
    .then((user) => {
      const userData = {
        id: user.user_id,
        username: user.username,
        role: user.role,
      };
      const token = generateToken(userData); // Membuat token JWT
      handleSuccessResponse(res, { token, user: userData }, "Login successful"); // Mengirim token sebagai respons
    })
    .catch((err) => handleErrorResponse(res, 401, err.message));
};

exports.getAllUsers = (req, res) => {
  UserModel.getAllUsers()
    .then((users) => handleSuccessResponse(res, users))
    .catch((err) => handleErrorResponse(res, 500, "Internal server error"));
};

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

exports.createUser = (req, res) => {
  const { name, email, username, password, role } = req.body;
  if (!name || !email || !username || !password || !role) {
    return handleErrorResponse(res, 400, "Missing required fields");
  }

  UserModel.createUser({ name, email, username, password, role })
    .then((result) => handleSuccessResponse(res, { id: result.insertId }, "User created successfully"))
    .catch((err) => handleErrorResponse(res, 409, "User already exists"));
};

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
