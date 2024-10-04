const ScoreModel = require("../models/scoreModel");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Get all scores
 */
exports.getAllScores = async (req, res) => {
  try {
    const scores = await ScoreModel.getAllScores();
    handleSuccessResponse(res, scores, "Data skor berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data skor.");
  }
};

/**
 * Get scores by match ID
 */
exports.getScoresByMatchId = async (req, res) => {
  const matchId = req.params.id;
  try {
    const scores = await ScoreModel.getScoresByMatchId(matchId);
    if (scores.length === 0) {
      return handleErrorResponse(res, 404, "Skor tidak ditemukan.");
    }
    handleSuccessResponse(res, scores, "Data skor berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data skor.");
  }
};

/**
 * Create new score
 */
exports.createScore = async (req, res) => {
  const { match_id, judge_id, athlete_id, kick_score, punch_score, elbow_score, knee_score, throw_score } = req.body;

  // Validasi input
  if (!match_id || !judge_id || !athlete_id) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    // Menambahkan skor baru
    const result = await ScoreModel.createScore({ match_id, judge_id, athlete_id, kick_score, punch_score, elbow_score, knee_score, throw_score });

    // Mengambil kembali data skor yang baru ditambahkan
    const newScore = await ScoreModel.getScoreById(result.insertId);

    handleSuccessResponse(res, newScore[0], "Skor berhasil ditambahkan.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan skor.");
  }
};

/**
 * Update score by ID
 */
exports.updateScore = async (req, res) => {
  const scoreId = req.params.id;
  const { kick_score, punch_score, elbow_score, knee_score, throw_score } = req.body;

  // Validasi input
  if (!kick_score || !punch_score || !elbow_score || !knee_score || !throw_score) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    await ScoreModel.updateScore(scoreId, { kick_score, punch_score, elbow_score, knee_score, throw_score });
    handleSuccessResponse(res, null, "Skor berhasil diperbarui.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat memperbarui skor.");
  }
};

/**
 * Delete score by ID
 */
exports.deleteScore = async (req, res) => {
  const scoreId = req.params.id;

  try {
    const result = await ScoreModel.deleteScore(scoreId);
    if (result.affectedRows === 0) {
      return handleErrorResponse(res, 404, "Skor tidak ditemukan.");
    }
    handleSuccessResponse(res, null, "Skor berhasil dihapus.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menghapus skor.");
  }
};
