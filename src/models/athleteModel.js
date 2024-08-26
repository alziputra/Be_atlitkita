const db = require('../config/db');

exports.getAllAthletes = () => {
  return db.promise().query("SELECT * FROM tb_athletes");
};

exports.getAthleteById = (athleteId) => {
  return db.promise().query("SELECT * FROM tb_athletes WHERE athlete_id = ?", [athleteId]);
};

exports.createAthlete = (athleteData) => {
  const { athlete_name, athlete_dob, athlete_country } = athleteData;
  return db.promise().query(
    "INSERT INTO tb_athletes (athlete_name, athlete_dob, athlete_country) VALUES (?, ?, ?)",
    [athlete_name, athlete_dob, athlete_country]
  );
};

exports.updateAthlete = (athleteId, athleteData) => {
  const { athlete_name, athlete_dob, athlete_country } = athleteData;
  return db.promise().query(
    "UPDATE tb_athletes SET athlete_name = ?, athlete_dob = ?, athlete_country = ? WHERE athlete_id = ?",
    [athlete_name, athlete_dob, athlete_country, athleteId]
  );
};

exports.deleteAthlete = (athleteId) => {
  return db.promise().query("DELETE FROM tb_athletes WHERE athlete_id = ?", [athleteId]);
};