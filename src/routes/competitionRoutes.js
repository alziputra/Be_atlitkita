const express = require("express");
const router = express.Router();
const competitionController = require("../controllers/competitionsController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

// Hanya admin yang bisa mengelola kompetisi
router.get("/", verifyToken, verifyRole(["admin","judge"]), competitionController.getAllCompetitions);
router.get("/:id", verifyToken, verifyRole(["admin"]), competitionController.getCompetitionById);
router.post("/", verifyToken, verifyRole(["admin"]), competitionController.addCompetition);
router.put("/:id", verifyToken, verifyRole(["admin"]), competitionController.updateCompetition);
router.delete("/:id", verifyToken, verifyRole(["admin"]), competitionController.deleteCompetition);

module.exports = router;
