const db = require("../config/db");

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mendapatkan semua skor untuk semua pertandingan
exports.getAllScores = async () => {
  try {
    const sql = `
      SELECT s.*, 
             m.match_id, 
             a1.name AS athlete1_name, 
             a2.name AS athlete2_name, 
             u.name AS judge_name 
      FROM tb_scores AS s
      JOIN tb_matches AS m ON s.match_id = m.match_id
      JOIN tb_athletes AS a1 ON m.athlete1_id = a1.athlete_id
      JOIN tb_athletes AS a2 ON m.athlete2_id = a2.athlete_id
      JOIN tb_users AS u ON s.judge_id = u.user_id
      ORDER BY s.created_at DESC
    `;
    const result = await query(sql, []);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan semua data skor.");
  }
};

// Mendapatkan skor berdasarkan ID
exports.getScoreById = async (scoreId) => {
  try {
    const sql = `
      SELECT s.*, m.match_id, u.name AS judge_name, a.name AS athlete_name
      FROM tb_scores s
      JOIN tb_matches m ON s.match_id = m.match_id
      JOIN tb_users u ON s.judge_id = u.user_id
      JOIN tb_athletes a ON s.athlete_id = a.athlete_id
      WHERE s.score_id = ?
    `;
    return await query(sql, [scoreId]);
  } catch (err) {
    throw new Error("Gagal mendapatkan data skor berdasarkan ID.");
  }
};

// Mendapatkan skor berdasarkan ID pertandingan
exports.getScoresByMatchId = async (matchId) => {
  try {
    const sql = `
      SELECT s.*, 
             a1.name AS athlete1_name, 
             a2.name AS athlete2_name, 
             u.name AS judge_name 
      FROM tb_scores AS s
      JOIN tb_matches AS m ON s.match_id = m.match_id
      JOIN tb_athletes AS a1 ON m.athlete1_id = a1.athlete_id
      JOIN tb_athletes AS a2 ON m.athlete2_id = a2.athlete_id
      JOIN tb_users AS u ON s.judge_id = u.user_id
      WHERE s.match_id = ?
      ORDER BY s.created_at DESC
    `;
    const result = await query(sql, [matchId]);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan skor berdasarkan ID pertandingan.");
  }
};

// Membuat skor baru
exports.createScore = async (scoreData) => {
  const { match_id, judge_id, athlete_id, kick_score, punch_score, elbow_score, knee_score, throw_score } = scoreData;
  try {
    const sql = `
      INSERT INTO tb_scores (match_id, judge_id, athlete_id, kick_score, punch_score, elbow_score, knee_score, throw_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return await query(sql, [match_id, judge_id, athlete_id, kick_score, punch_score, elbow_score, knee_score, throw_score]);
  } catch (err) {
    throw new Error("Gagal menambahkan skor.");
  }
};

// Memperbarui skor
exports.updateScore = async (scoreId, scoreData) => {
  const { kick_score, punch_score, elbow_score, knee_score, throw_score } = scoreData;
  try {
    const sql = `
      UPDATE tb_scores 
      SET kick_score = ?, punch_score = ?, elbow_score = ?, knee_score = ?, throw_score = ? 
      WHERE score_id = ?
    `;
    return await query(sql, [kick_score, punch_score, elbow_score, knee_score, throw_score, scoreId]);
  } catch (err) {
    throw new Error("Gagal memperbarui skor.");
  }
};

// Menghapus skor berdasarkan ID
exports.deleteScore = async (scoreId) => {
  try {
    const sql = `DELETE FROM tb_scores WHERE score_id = ?`;
    const result = await query(sql, [scoreId]);
    return result;
  } catch (err) {
    throw new Error("Gagal menghapus skor.");
  }
};
