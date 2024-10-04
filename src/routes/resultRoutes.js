const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");

// Route untuk hasil pertandingan
router.get("/", resultController.getAllResults);
router.get("/:id", resultController.getResultByMatchId);
router.post("/", resultController.createResult);
router.put("/:id", resultController.updateResult);
router.delete("/:id", resultController.deleteResult);

// Route untuk mendapatkan hasil akhir dari suatu kompetisi
router.get("/competitions/:id/results", resultController.getFinalResults);

module.exports = router;
