const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

// Hanya juri yang bisa memberikan penilaian
router.get("/", verifyToken, verifyRole(["judge"]), scoreController.getAllScores);
router.get("/:id", verifyToken, verifyRole(["judge"]), scoreController.getScoreById);
router.post("/", verifyToken, verifyRole(["judge"]), scoreController.addScore);
router.put("/:id", verifyToken, verifyRole(["judge"]), scoreController.updateScore);
router.delete("/:id", verifyToken, verifyRole(["judge"]), scoreController.deleteScore);

module.exports = router;
