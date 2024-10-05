const jwt = require("jsonwebtoken");

// Middleware untuk verifikasi JWT token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid." });
    }
    req.user = user; // Menyimpan user info dari token ke request object
    next();
  });
};

// Middleware untuk otorisasi berdasarkan peran (role)
exports.verifyRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: "Akses ditolak. Hak akses tidak mencukupi." });
  }
  next();
};
