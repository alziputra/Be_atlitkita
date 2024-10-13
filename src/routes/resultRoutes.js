const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");
const { verifyToken, verifyRole } = require("../middleware/authMiddleware");

// Hanya admin yang bisa mengelola hasil pertandingan
router.get("/", verifyToken, verifyRole(["admin", "judge"]), resultController.getAllResults);
router.get("/:id", verifyToken, verifyRole(["admin", "judge"]), resultController.getResultById);
router.post("/", verifyToken, verifyRole(["judge"]), resultController.addResult);
router.put("/:id", verifyToken, verifyRole(["admin"]), resultController.updateResult);
router.delete("/:id", verifyToken, verifyRole(["admin"]), resultController.deleteResult);

module.exports = router;
