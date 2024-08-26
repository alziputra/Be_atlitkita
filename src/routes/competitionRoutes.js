const express = require("express");
const router = express.Router();
const competitionController = require("../controllers/competitionsController");

router.get("/", competitionController.getAllCompetitions);
router.get("/:id", competitionController.getCompetitionById);
router.post("/", competitionController.createCompetition);
router.put("/:id", competitionController.updateCompetition);
router.delete("/:id", competitionController.deleteCompetition);

module.exports = router;
