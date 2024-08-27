const db = require("../config/db");

exports.getAllAthletes = () => {
  return db.promise().query("SELECT * FROM tb_athletes");
};

exports.getAthleteById = (athleteId) => {
  return db.promise().query("SELECT * FROM tb_athletes WHERE athlete_id = ?", [athleteId]);
};

exports.getAthleteByName = (name) => {
  return db.promise().query("SELECT * FROM tb_athletes WHERE name = ?", [name]);
};

exports.createAthlete = (athleteData) => {
  const { name, team, martial, weight, height } = athleteData;
  return db.promise().query("INSERT INTO tb_athletes (name, team, martial, weight, height) VALUES (?, ?, ?, ?, ?)", [name, team, martial, weight, height]);
};

exports.updateAthlete = (athleteId, athleteData) => {
  const { name, team, martial, weight, height } = athleteData;
  return db.promise().query("UPDATE tb_athletes SET name = ?, team = ?, martial= ?, weight = ?, height = ? WHERE athlete_id = ?", [name, team, martial, weight, height, athleteId]);
};

exports.deleteAthlete = (athleteId) => {
  return db.promise().query("DELETE FROM tb_athletes WHERE athlete_id = ?", [athleteId]);
};
