const db = require("../config/db");

// Get all scores
exports.getAllScores = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tb_scores", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Get score by ID
exports.getScoreById = (scoreId) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tb_scores WHERE score_id = ?", [scoreId], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

exports.createScore = (scoreData) => {
  const { competition_id, athlete_id, judge_id, kick_score = 0, punch_score = 0, elbow_score = 0, knee_score = 0, throw_score = 0 } = scoreData;

  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tb_scores (competition_id, athlete_id, judge_id, kick_score, punch_score, elbow_score, knee_score, throw_score, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())",
      [competition_id, athlete_id, judge_id, kick_score, punch_score, elbow_score, knee_score, throw_score],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

exports.updateScore = (scoreId, scoreData) => {
  const { competition_id, athlete_id, judge_id, kick_score = 0, punch_score = 0, elbow_score = 0, knee_score = 0, throw_score = 0 } = scoreData;

  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE tb_scores SET competition_id = ?, athlete_id = ?, judge_id = ?, kick_score = ?, punch_score = ?, elbow_score = ?, knee_score = ?, throw_score = ? WHERE score_id = ?",
      [competition_id, athlete_id, judge_id, kick_score, punch_score, elbow_score, knee_score, throw_score, scoreId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

// Delete score
exports.deleteScore = (scoreId) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM tb_scores WHERE score_id = ?", [scoreId], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
