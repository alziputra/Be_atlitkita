const db = require("../config/db");

// Get all competitions
exports.getAllCompetitions = (req, res) => {
  db.query("SELECT * FROM tb_competitions", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Get competition by ID
exports.getCompetitionById = (req, res) => {
  const competitionId = req.params.id;
  db.query("SELECT * FROM tb_competitions WHERE competition_id = ?", [competitionId], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// Create new competition
exports.createCompetition = (req, res) => {
  const { competition_name, competition_date, status } = req.body;
  db.query("INSERT INTO tb_competitions (competition_name, competition_date, status) VALUES (?, ?, ?)", [competition_name, competition_date, status], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId });
  });
};

// Update competition
exports.updateCompetition = (req, res) => {
  const competitionId = req.params.id;
  const { competition_name, competition_date, status } = req.body;
  db.query("UPDATE tb_competitions SET competition_name = ?, competition_date = ?, status = ? WHERE competition_id = ?", [competition_name, competition_date, status, competitionId], (err, result) => {
    if (err) throw err;
    res.json({ message: "Competition updated successfully" });
  });
};

// Delete competition
exports.deleteCompetition = (req, res) => {
  const competitionId = req.params.id;
  db.query("DELETE FROM tb_competitions WHERE competition_id = ?", [competitionId], (err, result) => {
    if (err) throw err;
    res.json({ message: "Competition deleted successfully" });
  });
};
