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
 * Get results by match ID
 */
exports.getResultsByMatchId = async (req, res) => {
  const matchId = req.params.id;

  try {
    const results = await ResultModel.getResultsByMatchId(matchId);
    if (results.length === 0) {
      return handleErrorResponse(res, 404, "Hasil tidak ditemukan untuk pertandingan ini.");
    }
    handleSuccessResponse(res, results, "Data hasil pertandingan berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data hasil pertandingan.");
  }
};

/**
 * Create new result based on scores
 */
exports.createResult = async (req, res) => {
  const matchId = req.body.match_id;

  if (!matchId) {
    return handleErrorResponse(res, 400, "ID pertandingan dibutuhkan.");
  }

  try {
    // Cek apakah hasil untuk match_id sudah ada di tb_results
    const existingResult = await ResultModel.getResultsByMatchId(matchId);
    if (existingResult.length > 0) {
      return handleErrorResponse(res, 409, "Hasil pertandingan untuk ID ini sudah ada.");
    }

    // Membuat hasil baru berdasarkan ID pertandingan
    const newResult = await ResultModel.createResult(matchId);

    // Mengambil data hasil pertandingan yang baru dibuat
    const resultData = await ResultModel.getResultsByMatchId(matchId);

    handleSuccessResponse(res, resultData, "Hasil pertandingan berhasil dibuat.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat membuat hasil pertandingan.");
  }
};

/**
 * Update result by ID
 */
exports.updateResult = async (req, res) => {
  const resultId = req.params.id;
  const { athlete1_final_score, athlete2_final_score, winner_id } = req.body;

  if (!athlete1_final_score || !athlete2_final_score || !winner_id) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    await ResultModel.updateResult(resultId, { athlete1_final_score, athlete2_final_score, winner_id });
    handleSuccessResponse(res, null, "Hasil pertandingan berhasil diperbarui.");
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
