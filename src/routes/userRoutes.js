const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { verifyToken } = require('../middleware/authMiddleware');

// Endpoint login
router.post("/login", userController.login);
// Route untuk mendapatkan data pengguna yang sedang login
router.get('/me', verifyToken, userController.getMe);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
