const express = require("express");
const router = express.Router();
const athleteController = require("../controllers/athletesController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

// Hanya admin yang bisa melihat, menambah, mengedit, dan menghapus data atlet
router.get("/", verifyToken, verifyRole(["admin","judge"]), athleteController.getAllAthletes);
router.get("/:id", verifyToken, verifyRole(["admin"]), athleteController.getAthleteById);
router.post("/", verifyToken, verifyRole(["admin"]), athleteController.addAthlete);
router.put("/:id", verifyToken, verifyRole(["admin"]), athleteController.updateAthlete);
router.delete("/:id", verifyToken, verifyRole(["admin"]), athleteController.deleteAthlete);

module.exports = router;
