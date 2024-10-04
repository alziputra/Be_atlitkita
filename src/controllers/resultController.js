const ResultModel = require("../models/resultModel");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Get all results
 */
exports.getAllResults = async (req, res) => {
  try {
    const results = await ResultModel.getAllResults();
    handleSuccessResponse(res, results, "Data hasil pertandingan berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data hasil pertandingan.");
  }
};

/**
 * Get result by match ID
 */
exports.getResultByMatchId = async (req, res) => {
  const matchId = req.params.id;
  try {
    const result = await ResultModel.getResultByMatchId(matchId);
    if (result.length === 0) {
      return handleErrorResponse(res, 404, "Hasil pertandingan tidak ditemukan.");
    }
    handleSuccessResponse(res, result[0], "Data hasil pertandingan berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data hasil pertandingan.");
  }
};

/**
 * Get final results by competition ID
 */
exports.getFinalResults = async (req, res) => {
  const competitionId = req.params.id;

  try {
    const finalResults = await ResultModel.getFinalResultsByCompetitionId(competitionId);
    if (finalResults.length === 0) {
      return handleErrorResponse(res, 404, "Tidak ada hasil akhir untuk kompetisi ini.");
    }
    handleSuccessResponse(res, finalResults, "Data hasil akhir kompetisi berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil hasil akhir kompetisi.");
  }
};

/**
 * Get judge scores by match ID
 */
exports.getJudgeScores = async (req, res) => {
  const matchId = req.params.id;

  try {
    const judgeScores = await ResultModel.getJudgeScoresByMatchId(matchId);
    if (judgeScores.length === 0) {
      return handleErrorResponse(res, 404, "Tidak ada skor juri untuk pertandingan ini.");
    }
    handleSuccessResponse(res, judgeScores, "Data skor juri berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data skor juri.");
  }
};

/**
 * Create new result
 */
exports.createResult = async (req, res) => {
  const { match_id, athlete1_final_score, athlete2_final_score, winner_id } = req.body;

  // Validasi input
  if (!match_id || athlete1_final_score === undefined || athlete2_final_score === undefined || !winner_id) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const newResult = await ResultModel.createResult({ match_id, athlete1_final_score, athlete2_final_score, winner_id });
    handleSuccessResponse(res, newResult, "Hasil pertandingan berhasil ditambahkan.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan hasil pertandingan.");
  }
};

/**
 * Update result by ID
 */
exports.updateResult = async (req, res) => {
  const resultId = req.params.id;
  const { athlete1_final_score, athlete2_final_score, winner_id } = req.body;

  // Validasi input
  if (athlete1_final_score === undefined || athlete2_final_score === undefined || !winner_id) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const result = await ResultModel.getResultById(resultId);
    if (result.length === 0) {
      return handleErrorResponse(res, 404, "Hasil pertandingan tidak ditemukan.");
    }

    await ResultModel.updateResult(resultId, { athlete1_final_score, athlete2_final_score, winner_id });

    handleSuccessResponse(
      res,
      {
        id: resultId,
        athlete1_final_score,
        athlete2_final_score,
        winner_id,
        updated_at: new Date().toISOString(),
      },
      "Hasil pertandingan berhasil diperbarui."
    );
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat memperbarui hasil pertandingan.");
  }
};

/**
 * Delete result by ID
 */
exports.deleteResult = async (req, res) => {
  const resultId = req.params.id;

  try {
    const result = await ResultModel.deleteResult(resultId);
    if (result.affectedRows === 0) {
      return handleErrorResponse(res, 404, "Hasil pertandingan tidak ditemukan.");
    }
    handleSuccessResponse(res, null, "Hasil pertandingan berhasil dihapus.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menghapus hasil pertandingan.");
  }
};
