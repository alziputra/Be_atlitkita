const db = require("../config/db");

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mendapatkan semua skor
exports.getAllScores = async () => {
  const sql = `
    SELECT s.*, a.name AS athlete_name, u.name AS judge_name, m.match_id, c.competition_name
    FROM tb_scores s
    JOIN tb_athletes a ON s.athlete_id = a.athlete_id
    JOIN tb_users u ON s.judge_id = u.user_id
    JOIN tb_matches m ON s.match_id = m.match_id
    JOIN tb_competitions c ON m.competition_id = c.competition_id
  `;
  return await query(sql, []);
};

// Mendapatkan skor berdasarkan ID pertandingan
exports.getScoreById = async (matchId) => {
  const sql = `
    SELECT s.*, a.name AS athlete_name, u.name AS judge_name
    FROM tb_scores s
    JOIN tb_athletes a ON s.athlete_id = a.athlete_id
    JOIN tb_users u ON s.judge_id = u.user_id
    WHERE s.match_id = ?
  `;
  return await query(sql, [matchId]);
};

// Membuat skor baru
exports.addScore = async (scoreData) => {
  try {
    const { match_id, judge_id, athlete_id, kick_score, punch_score, elbow_score, knee_score, throw_score } = scoreData;

    const sql = `
      INSERT INTO tb_scores (match_id, judge_id, athlete_id, kick_score, punch_score, elbow_score, knee_score, throw_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [match_id, judge_id, athlete_id, kick_score, punch_score, elbow_score, knee_score, throw_score]);
    return result;
  } catch (err) {
    throw err; // Lempar error agar bisa ditangani di controller
  }
};

// Memperbarui skor berdasarkan ID
exports.updateScore = async (scoreId, scoreData) => {
  const { kick_score, punch_score, elbow_score, knee_score, throw_score } = scoreData;
  const sql = `
    UPDATE tb_scores
    SET kick_score = ?, punch_score = ?, elbow_score = ?, knee_score = ?, throw_score = ?
    WHERE score_id = ?
  `;
  return await query(sql, [kick_score, punch_score, elbow_score, knee_score, throw_score, scoreId]);
};

// Menghapus skor berdasarkan ID
exports.deleteScore = async (scoreId) => {
  const sql = `DELETE FROM tb_scores WHERE score_id = ?`;
  return await query(sql, [scoreId]);
};
