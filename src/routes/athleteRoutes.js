const express = require("express");
const router = express.Router();
const athleteController = require("../controllers/athletesController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

router.get("/", verifyToken, athleteController.getAllAthletes);
router.get("/:id", athleteController.getAthleteById);
router.post("/", athleteController.addAthlete);
router.put("/:id", athleteController.updateAthlete);
router.delete("/:id", athleteController.deleteAthlete);

module.exports = router;