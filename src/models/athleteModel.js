//
const db = require("../config/db");

exports.getAllAthletes = () => {
  return db.promise().query("SELECT * FROM tb_athletes");
};

exports.getAthleteById = (athleteId) => {
  return db.promise().query("SELECT * FROM tb_athletes WHERE athlete_id = ?", [athleteId]);
};

exports.createAthlete = (athleteData) => {
  const { name, team, weight, height } = athleteData;
  return db.promise().query("INSERT INTO tb_athletes (name, team, weight, height) VALUES (?, ?, ?, ?)", [name, team, weight, height]);
};

exports.updateAthlete = (athleteId, athleteData) => {
  const { name, team, weight, height } = athleteData;
  return db.promise().query("UPDATE tb_athletes SET name = ?, team = ?, weight = ?, height = ? WHERE athlete_id = ?", [name, team, weight, height, athleteId]);
};

exports.deleteAthlete = (athleteId) => {
  return db.promise().query("DELETE FROM tb_athletes WHERE athlete_id = ?", [athleteId]);
};
