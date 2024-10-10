const jwt = require("jsonwebtoken");

// Middleware untuk verifikasi JWT token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token telah kadaluarsa. Silakan login kembali." });
      }
      return res.status(403).json({ message: "Token tidak valid." });
    }

    // Simpan seluruh payload dari token ke req.user
    req.user = decoded; // decoded harus berisi role_name, id, dll.
    next();
  });
};

// Middleware untuk otorisasi berdasarkan peran (role)
exports.verifyRole = (roles) => (req, res, next) => {
  console.log("Role pengguna saat ini:", req.user.role_name); // Debugging
  if (!roles.includes(req.user.role_name)) {
    return res.status(403).json({ message: "Akses ditolak. Hak akses tidak mencukupi." });
  }
  next();
};
