const UserModel = require("../models/userModel");

const handleSuccessResponse = (res, data, message) => {
  if (message) {
    res.json({ message, data });
  } else {
    res.json(data);
  }
};

const handleErrorResponse = (res, statusCode, errorMessage, details) => {
  res.status(statusCode).json({ error: errorMessage, details });
};

exports.getAllUsers = (req, res) => {
  UserModel.getAllUsers()
    .then((users) => handleSuccessResponse(res, users))
    .catch((err) => handleErrorResponse(res, 500, "Internal server error", err.message));
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
    .catch((err) => handleErrorResponse(res, 500, "Internal server error", err.message));
};

exports.createUser = (req, res) => {
  const { name, email, username, password, role } = req.body;
  if (!name || !email || !username || !password || !role) {
    return handleErrorResponse(res, 400, "Missing required fields");
  }

  UserModel.createUser({ name, email, username, password, role })
    .then((result) => handleSuccessResponse(res, { id: result.insertId }, "User created successfully"))
    .catch((err) => handleErrorResponse(res, 409, "User already exists", err.message));
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email, username, password, role } = req.body;
  if (!name || !email || !username || !password || !role) {
    return handleErrorResponse(res, 400, "Missing required fields");
  }

  UserModel.updateUser(userId, { name, email, username, password, role })
    .then(() => handleSuccessResponse(res, null, "User updated successfully"))
    .catch((err) => handleErrorResponse(res, 404, "User not found", err.message));
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  UserModel.deleteUser(userId)
    .then(() => handleSuccessResponse(res, null, "User deleted successfully"))
    .catch((err) => {
      if (err.message === "User not found") {
        handleErrorResponse(res, 404, "User not found");
      } else {
        handleErrorResponse(res, 500, "Internal server error", err.message);
      }
    });
};
