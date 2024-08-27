const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scoresController");

router.get("/", scoresController.getAllScores);
router.get("/:id", scoresController.getScoreById);
router.post("/", scoresController.createScore);
router.put("/:id", scoresController.updateScore);
router.delete("/:id", scoresController.deleteScore);

module.exports = router;
