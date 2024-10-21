const MatchModel = require("../models/matchModel");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Get all matches
 */
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await MatchModel.getAllMatches();
    handleSuccessResponse(res, matches, "Data pertandingan berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data pertandingan.");
  }
};

/**
 * Get match by ID
 */
exports.getMatchById = async (req, res) => {
  const matchId = req.params.id;
  try {
    const match = await MatchModel.getMatchById(matchId);
    if (match.length === 0) {
      return handleErrorResponse(res, 404, "Pertandingan tidak ditemukan.");
    }
    handleSuccessResponse(res, match[0], "Data pertandingan berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data pertandingan.");
  }
};

/**
 * Create new match
 */
exports.addMatch = async (req, res) => {
  const { competition_id, athlete1_id, athlete2_id, match_number } = req.body;

  // Validate input
  if (!competition_id || !athlete1_id || !athlete2_id || match_number == null) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    // Add new match
    const result = await MatchModel.addMatch({ competition_id, athlete1_id, athlete2_id, match_number });

    // Retrieve the newly added match
    const newMatch = await MatchModel.getMatchById(result.insertId);

    handleSuccessResponse(res, newMatch[0], "Pertandingan berhasil ditambahkan.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan pertandingan.");
  }
};

/**
 * Update match by ID
 */
exports.updateMatch = async (req, res) => {
  const matchId = req.params.id;
  const { competition_id, athlete1_id, athlete2_id, match_number } = req.body;

  // Validate input
  if (!competition_id || !athlete1_id || !athlete2_id || match_number == null) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const match = await MatchModel.getMatchById(matchId);
    if (match.length === 0) {
      return handleErrorResponse(res, 404, "Pertandingan tidak ditemukan.");
    }

    await MatchModel.updateMatch(matchId, { competition_id, athlete1_id, athlete2_id, match_number });

    handleSuccessResponse(
      res,
      {
        id: matchId,
        competition_id,
        athlete1_id,
        athlete2_id,
        match_number,
        updated_at: new Date().toISOString(),
      },
      "Pertandingan berhasil diperbarui."
    );
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat memperbarui data pertandingan.");
  }
};

/**
 * Delete match by ID
 */
exports.deleteMatch = async (req, res) => {
  const matchId = req.params.id;

  try {
    const result = await MatchModel.deleteMatch(matchId);
    if (result.affectedRows === 0) {
      return handleErrorResponse(res, 404, "Pertandingan tidak ditemukan.");
    }
    handleSuccessResponse(res, null, "Pertandingan berhasil dihapus.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menghapus pertandingan.");
  }
};
