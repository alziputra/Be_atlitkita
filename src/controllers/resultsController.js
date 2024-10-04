const ResultModel = require("../models/resultModel");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Get all results
 */
exports.getAllResults = async (req, res) => {
  try {
    const results = await ResultModel.getAllResults();
    if (results.length > 0) {
      handleSuccessResponse(res, results, "Data hasil berhasil diambil.");
    } else {
      handleSuccessResponse(res, [], "Tidak ada hasil yang ditemukan.");
    }
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data hasil.");
  }
};

/**
 * Get result by ID
 */
exports.getResultById = async (req, res) => {
  const resultId = req.params.id;
  try {
    const result = await ResultModel.getResultById(resultId);
    if (result.length === 0) {
      return handleErrorResponse(res, 404, "Hasil tidak ditemukan.");
    }
    handleSuccessResponse(res, result[0], "Data hasil berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data hasil.");
  }
};

/**
 * Create new result
 */
exports.createResult = async (req, res) => {
  const { athlete_id, score, competition_id } = req.body;

  if (!athlete_id || !score || !competition_id) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const result = await ResultModel.createResult(req.body);
    const newResultData = {
      id: result.insertId,
      athlete_id,
      score,
      competition_id,
      created_at: new Date().toISOString(),
    };

    handleSuccessResponse(res, newResultData, "Hasil berhasil ditambahkan.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan hasil.");
  }
};

/**
 * Update result by ID
 */
exports.updateResult = async (req, res) => {
  const resultId = req.params.id;
  const { athlete_id, score, competition_id } = req.body;

  if (!athlete_id || !score || !competition_id) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const result = await ResultModel.updateResult(resultId, req.body);
    if (result.affectedRows === 0) {
      return handleErrorResponse(res, 404, "Hasil tidak ditemukan.");
    }

    handleSuccessResponse(res, null, "Hasil berhasil diperbarui.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat memperbarui hasil.");
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
      return handleErrorResponse(res, 404, "Hasil tidak ditemukan.");
    }

    handleSuccessResponse(res, null, "Hasil berhasil dihapus.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menghapus hasil.");
  }
};
