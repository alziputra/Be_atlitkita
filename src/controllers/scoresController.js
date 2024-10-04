const ScoreModel = require("../models/scoreModel");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Get all scores with athlete and competition details
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
 * Get score by ID with athlete and competition details
 */
exports.getScoreById = async (req, res) => {
  const scoreId = req.params.id;
  try {
    const score = await ScoreModel.getScoreById(scoreId);
    if (score.length === 0) {
      return handleErrorResponse(res, 404, "Skor tidak ditemukan.");
    }
    handleSuccessResponse(res, score[0], "Data skor berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data skor.");
  }
};

/**
 * Create a new score
 */
exports.createScore = async (req, res) => {
  const scoreData = req.body;
  try {
    const result = await ScoreModel.createScore(scoreData);
    handleSuccessResponse(res, result, "Skor berhasil ditambahkan.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan skor.");
  }
};

/**
 * Update score by ID
 */
exports.updateScore = async (req, res) => {
  const scoreId = req.params.id;
  const scoreData = req.body;
  try {
    const result = await ScoreModel.updateScore(scoreId, scoreData);
    if (result.affectedRows === 0) {
      return handleErrorResponse(res, 404, "Skor tidak ditemukan.");
    }
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
