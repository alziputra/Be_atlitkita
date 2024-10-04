const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");

router.get("/", resultController.getAllResults);
router.get("/:id", resultController.getResultByMatchId);
router.post("/", resultController.createResult);
router.put("/:id", resultController.updateResult);
router.delete("/:id", resultController.deleteResult);

module.exports = router;
