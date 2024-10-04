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
  const { match_id, judge_id, athlete1_score, athlete2_score } = req.body;

  // Validasi input
  if (!match_id || !judge_id || athlete1_score === undefined || athlete2_score === undefined) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const newScore = await ScoreModel.createScore({ match_id, judge_id, athlete1_score, athlete2_score });
    handleSuccessResponse(res, newScore, "Skor berhasil ditambahkan.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan skor.");
  }
};

/**
 * Update score by ID
 */
exports.updateScore = async (req, res) => {
  const scoreId = req.params.id;
  const { athlete1_score, athlete2_score } = req.body;

  // Validasi input
  if (athlete1_score === undefined || athlete2_score === undefined) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const score = await ScoreModel.getScoreById(scoreId);
    if (score.length === 0) {
      return handleErrorResponse(res, 404, "Skor tidak ditemukan.");
    }

    await ScoreModel.updateScore(scoreId, { athlete1_score, athlete2_score });

    handleSuccessResponse(
      res,
      {
        id: scoreId,
        athlete1_score,
        athlete2_score,
        updated_at: new Date().toISOString(),
      },
      "Skor berhasil diperbarui."
    );
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
