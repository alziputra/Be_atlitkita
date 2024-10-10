const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

// Hanya admin yang bisa mengelola pertandingan
router.get("/", verifyToken, verifyRole(["admin"]), matchController.getAllMatches);
router.get("/:id", verifyToken, verifyRole(["admin"]), matchController.getMatchById);
router.post("/", verifyToken, verifyRole(["admin"]), matchController.addMatch);
router.put("/:id", verifyToken, verifyRole(["admin"]), matchController.updateMatch);
router.delete("/:id", verifyToken, verifyRole(["admin"]), matchController.deleteMatch);

module.exports = router;
