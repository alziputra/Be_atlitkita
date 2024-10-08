const express = require("express");
const router = express.Router();
const competitionController = require("../controllers/competitionsController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

// semua pengguna dapat mengakses atau melihat daftar kompetisi
router.get("/", competitionController.getAllCompetitions);
router.get("/:id", verifyToken, competitionController.getCompetitionById);

// hanya pengguna dengan role "admin" yang dapat membuat, mengubah, dan menghapus kompetisi
router.post("/", verifyToken, verifyRole("admin"), competitionController.createCompetition);
router.put("/:id", verifyToken, verifyRole("admin"), competitionController.updateCompetition);
router.delete("/:id", verifyToken, verifyRole("admin"), competitionController.deleteCompetition);

module.exports = router;
