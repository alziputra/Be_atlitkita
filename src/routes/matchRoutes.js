const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");
const resultController = require("../controllers/resultController");

// Route untuk pertandingan
router.get("/", matchController.getAllMatches);
router.get("/:id", matchController.getMatchById);
router.post("/", matchController.createMatch);
router.put("/:id", matchController.updateMatch);
router.delete("/:id", matchController.deleteMatch);

// Route untuk mendapatkan skor juri berdasarkan ID pertandingan
router.get("/:id/judge-scores", resultController.getJudgeScores);

module.exports = router;
