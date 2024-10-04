const db = require("../config/db");

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mendapatkan semua hasil pertandingan
exports.getAllResults = async () => {
  try {
    const sql = `
      SELECT r.*, 
             m.competition_id, 
             a1.name AS athlete1_name, 
             a2.name AS athlete2_name, 
             winner.name AS winner_name, 
             c.competition_name 
      FROM tb_results AS r
      JOIN tb_matches AS m ON r.match_id = m.match_id
      JOIN tb_competitions AS c ON m.competition_id = c.competition_id
      JOIN tb_athletes AS a1 ON m.athlete1_id = a1.athlete_id
      JOIN tb_athletes AS a2 ON m.athlete2_id = a2.athlete_id
      LEFT JOIN tb_athletes AS winner ON r.winner_id = winner.athlete_id
      ORDER BY r.created_at DESC
    `;
    const result = await query(sql, []);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan semua data hasil pertandingan.");
  }
};

// Mendapatkan hasil berdasarkan ID pertandingan
exports.getResultByMatchId = async (matchId) => {
  try {
    const sql = `
      SELECT r.*, 
             a1.name AS athlete1_name, 
             a2.name AS athlete2_name, 
             winner.name AS winner_name 
      FROM tb_results AS r
      JOIN tb_matches AS m ON r.match_id = m.match_id
      JOIN tb_athletes AS a1 ON m.athlete1_id = a1.athlete_id
      JOIN tb_athletes AS a2 ON m.athlete2_id = a2.athlete_id
      LEFT JOIN tb_athletes AS winner ON r.winner_id = winner.athlete_id
      WHERE r.match_id = ?
    `;
    const result = await query(sql, [matchId]);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan hasil pertandingan berdasarkan ID.");
  }
};

// Membuat hasil pertandingan baru
exports.createResult = async (resultData) => {
  try {
    const { match_id, athlete1_final_score, athlete2_final_score, winner_id } = resultData;
    const sql = `
      INSERT INTO tb_results (match_id, athlete1_final_score, athlete2_final_score, winner_id) 
      VALUES (?, ?, ?, ?)
    `;
    const result = await query(sql, [match_id, athlete1_final_score, athlete2_final_score, winner_id]);
    return result;
  } catch (err) {
    throw new Error("Gagal membuat hasil pertandingan baru.");
  }
};

// Memperbarui hasil pertandingan
exports.updateResult = async (resultId, resultData) => {
  try {
    const { athlete1_final_score, athlete2_final_score, winner_id } = resultData;
    const sql = `
      UPDATE tb_results 
      SET athlete1_final_score = ?, athlete2_final_score = ?, winner_id = ? 
      WHERE result_id = ?
    `;
    const result = await query(sql, [athlete1_final_score, athlete2_final_score, winner_id, resultId]);
    return result;
  } catch (err) {
    throw new Error("Gagal memperbarui hasil pertandingan.");
  }
};

// Menghapus hasil pertandingan berdasarkan ID
exports.deleteResult = async (resultId) => {
  try {
    const sql = `DELETE FROM tb_results WHERE result_id = ?`;
    const result = await query(sql, [resultId]);
    return result;
  } catch (err) {
    throw new Error("Gagal menghapus hasil pertandingan.");
  }
};
