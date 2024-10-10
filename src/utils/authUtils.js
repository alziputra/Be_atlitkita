const jwt = require("jsonwebtoken");

// Fungsi untuk membuat access token
exports.generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      name: user.name,
      email: user.email,
      role_name: user.role_name // Tambahkan role_name ke payload token
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRATION } // Gunakan durasi token dari .env
  );
};

// Fungsi untuk membuat refresh token
exports.generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      name: user.name,
      email: user.email,
      role_name: user.role_name, // Tambahkan role_name ke payload token
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRATION } // Gunakan durasi token dari .env
  );
};
