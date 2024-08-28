const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", userController.loginUser);

// Rute di bawah ini dilindungi oleh JWT
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.post("/", authMiddleware, userController.createUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
