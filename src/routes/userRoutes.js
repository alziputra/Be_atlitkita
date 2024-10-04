const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// Rute lain yang dilindungi oleh JWT
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
