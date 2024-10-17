const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

// Endpoint login tidak memerlukan token
router.post("/login", userController.login);

// Hanya admin yang bisa mengelola data pengguna
router.get("/", verifyToken, verifyRole(["admin", "judge"]), userController.getAllUsers);
router.get("/:id", verifyToken, verifyRole(["admin"]), userController.getUserById);
router.post("/", verifyToken, verifyRole(["admin"]), userController.createUser);
router.put("/:id", verifyToken, verifyRole(["admin"]), userController.updateUser);
router.delete("/:id", verifyToken, verifyRole(["admin"]), userController.deleteUser);

module.exports = router;
