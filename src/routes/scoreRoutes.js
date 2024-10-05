const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scoreController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

// Semua pengguna dapat mengakses atau melihat daftar skor
router.get("/", verifyToken, scoresController.getAllScores);
router.get("/:id", verifyToken, scoresController.getScoresByMatchId);

// Hanya pengguna dengan role "admin" yang dapat membuat, mengubah, dan menghapus skor
router.post("/", verifyToken, verifyRole("judge"), scoresController.createScore);
router.put("/:id", verifyToken, verifyRole("judge"), scoresController.updateScore);
router.delete("/:id", verifyToken, verifyRole("judge"), scoresController.deleteScore);

module.exports = router;
