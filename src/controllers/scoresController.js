const ScoreModel = require("../models/scoreModel");

// Get all scores
exports.getAllScores = async (req, res) => {
  try {
    const [scores] = await ScoreModel.getAllScores();
    res.json(scores);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve scores" });
  }
};

// Get score by ID
exports.getScoreById = async (req, res) => {
  try {
    const [score] = await ScoreModel.getScoreById(req.params.id);
    if (score.length === 0) {
      return res.status(404).json({ message: "Score not found" });
    }
    res.json(score[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve score" });
  }
};

// Create new score
exports.createScore = async (req, res) => {
  try {
    const result = await ScoreModel.createScore(req.body);
    res.status(201).json({ id: result.insertId, message: "Score created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create score" });
  }
};

// Update score
exports.updateScore = async (req, res) => {
  try {
    const result = await ScoreModel.updateScore(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Score not found" });
    }
    res.json({ message: "Score updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update score" });
  }
};

// Delete score
exports.deleteScore = async (req, res) => {
  try {
    const result = await ScoreModel.deleteScore(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Score not found" });
    }
    res.json({ message: "Score deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete score" });
  }
};
