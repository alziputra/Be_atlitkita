const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");

// Route untuk hasil pertandingan
router.get("/matches/:id", resultController.getResultsByMatchId);
router.post("/", resultController.createResult);
router.put("/:id", resultController.updateResult);
router.delete("/:id", resultController.deleteResult);

module.exports = router;
