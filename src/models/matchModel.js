const db = require("../config/db");

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mendapatkan semua pertandingan
exports.getAllMatches = async () => {
  try {
    const sql = `
      SELECT m.*, c.competition_name, a1.name AS athlete1_name, a2.name AS athlete2_name 
      FROM tb_matches AS m
      JOIN tb_competitions AS c ON m.competition_id = c.competition_id
      JOIN tb_athletes AS a1 ON m.athlete1_id = a1.athlete_id
      JOIN tb_athletes AS a2 ON m.athlete2_id = a2.athlete_id
      ORDER BY m.match_date DESC
    `;

    const result = await query(sql, []);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan data pertandingan.");
  }
};

// Mendapatkan pertandingan berdasarkan ID
exports.getMatchById = async (matchId) => {
  try {
    const sql = `
      SELECT m.*, c.competition_name, a1.name AS athlete1_name, a2.name AS athlete2_name 
      FROM tb_matches AS m
      JOIN tb_competitions AS c ON m.competition_id = c.competition_id
      JOIN tb_athletes AS a1 ON m.athlete1_id = a1.athlete_id
      JOIN tb_athletes AS a2 ON m.athlete2_id = a2.athlete_id
      WHERE m.match_id = ?
    `;

    const result = await query(sql, [matchId]);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan data pertandingan berdasarkan ID.");
  }
};

// Membuat pertandingan baru
exports.addMatch = async (matchData) => {
  try {
    const { competition_id, athlete1_id, athlete2_id } = matchData;

    const sql = `
      INSERT INTO tb_matches (competition_id, athlete1_id, athlete2_id) 
      VALUES (?, ?, ?)
    `;

    const result = await query(sql, [competition_id, athlete1_id, athlete2_id]);
    return result;
  } catch (err) {
    throw new Error("Gagal membuat pertandingan baru.");
  }
};

// Memperbarui pertandingan
exports.updateMatch = async (matchId, matchData) => {
  try {
    const { competition_id, athlete1_id, athlete2_id } = matchData;

    const sql = `
      UPDATE tb_matches 
      SET competition_id = ?, athlete1_id = ?, athlete2_id = ? 
      WHERE match_id = ?
    `;

    const result = await query(sql, [competition_id, athlete1_id, athlete2_id, matchId]);
    return result;
  } catch (err) {
    throw new Error("Gagal memperbarui data pertandingan.");
  }
};

// Menghapus pertandingan berdasarkan ID
exports.deleteMatch = async (matchId) => {
  try {
    const sql = `DELETE FROM tb_matches WHERE match_id = ?`;
    const result = await query(sql, [matchId]);
    return result;
  } catch (err) {
    throw new Error("Gagal menghapus pertandingan.");
  }
};
