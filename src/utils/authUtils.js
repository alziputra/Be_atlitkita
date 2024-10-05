const jwt = require("jsonwebtoken");

// Membuat access token
exports.generateAccessToken = (user) => {
  return jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRATION });
};

// Membuat refresh token
exports.generateRefreshToken = (user) => {
  return jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
};
