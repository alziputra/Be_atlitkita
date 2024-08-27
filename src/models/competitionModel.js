const db = require('../config/db');

// Get all competitions
exports.getAllCompetitions = () => {
  return db.promise().query("SELECT * FROM tb_competitions");
};

// Get competition by ID
exports.getCompetitionById = (competitionId) => {
  return db.promise().query("SELECT * FROM tb_competitions WHERE competition_id = ?", [competitionId]);
};

// Create new competition
exports.createCompetition = (competitionData) => {
  const { competition_name, competition_date, status } = competitionData;
  return db.promise().query(
    "INSERT INTO tb_competitions (competition_name, competition_date, status) VALUES (?, ?, ?)",
    [competition_name, competition_date, status]
  );
};

// Update competition
exports.updateCompetition = (competitionId, competitionData) => {
  const { competition_name, competition_date, status } = competitionData;
  return db.promise().query(
    "UPDATE tb_competitions SET competition_name = ?, competition_date = ?, status = ? WHERE competition_id = ?",
    [competition_name, competition_date, status, competitionId]
  );
};

// Delete competition
exports.deleteCompetition = (competitionId) => {
  return db.promise().query("DELETE FROM tb_competitions WHERE competition_id = ?", [competitionId]);
};
