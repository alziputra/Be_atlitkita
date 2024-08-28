const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  };

  // '1m' untuk 1 menit.
  // '10m' untuk 10 menit.
  // '1h' untuk 1 jam.
  // '1d' untuk 1 hari.

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30" });
};

module.exports = generateToken;
