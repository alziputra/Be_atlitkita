const db = require("../config/db");

// Wrapper untuk query database menggunakan Promise
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

/**
 * Mendapatkan semua skor beserta detail atlet dan kompetisi
 */
exports.getAllScores = async () => {
  const sql = `
    SELECT 
      s.score_id, s.competition_id, s.athlete_id, s.judge_id, s.kick_score, s.punch_score, s.elbow_score, 
      s.knee_score, s.throw_score, s.total_score, s.created_at, 
      a.name AS athlete_name, c.competition_name 
    FROM tb_scores s
    JOIN tb_athletes a ON s.athlete_id = a.athlete_id
    JOIN tb_competitions c ON s.competition_id = c.competition_id
  `;
  return query(sql, []);
};

/**
 * Mendapatkan skor berdasarkan ID dengan detail atlet dan kompetisi
 */
exports.getScoreById = async (scoreId) => {
  const sql = `
    SELECT 
      s.score_id, s.competition_id, s.athlete_id, s.judge_id, s.kick_score, s.punch_score, s.elbow_score, 
      s.knee_score, s.throw_score, s.total_score, s.created_at, 
      a.name AS athlete_name, c.competition_name 
    FROM tb_scores s
    JOIN tb_athletes a ON s.athlete_id = a.athlete_id
    JOIN tb_competitions c ON s.competition_id = c.competition_id
    WHERE s.score_id = ?
  `;
  return query(sql, [scoreId]);
};

/**
 * Membuat skor baru
 */
exports.createScore = async (scoreData) => {
  const { competition_id, athlete_id, judge_id, kick_score = 0, punch_score = 0, elbow_score = 0, knee_score = 0, throw_score = 0 } = scoreData;
  const sql = `
    INSERT INTO tb_scores (competition_id, athlete_id, judge_id, kick_score, punch_score, elbow_score, knee_score, throw_score, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;
  return query(sql, [competition_id, athlete_id, judge_id, kick_score, punch_score, elbow_score, knee_score, throw_score]);
};

/**
 * Memperbarui skor berdasarkan ID
 */
exports.updateScore = async (scoreId, scoreData) => {
  const { competition_id, athlete_id, judge_id, kick_score = 0, punch_score = 0, elbow_score = 0, knee_score = 0, throw_score = 0 } = scoreData;
  const sql = `
    UPDATE tb_scores 
    SET competition_id = ?, athlete_id = ?, judge_id = ?, kick_score = ?, punch_score = ?, elbow_score = ?, knee_score = ?, throw_score = ? 
    WHERE score_id = ?
  `;
  return query(sql, [competition_id, athlete_id, judge_id, kick_score, punch_score, elbow_score, knee_score, throw_score, scoreId]);
};

/**
 * Menghapus skor berdasarkan ID
 */
exports.deleteScore = async (scoreId) => {
  const sql = "DELETE FROM tb_scores WHERE score_id = ?";
  return query(sql, [scoreId]);
};
