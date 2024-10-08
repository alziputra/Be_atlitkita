const AthleteModel = require("../models/athleteModel");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Get all athletes
 */
exports.getAllAthletes = async (req, res) => {
  try {
    const athletes = await AthleteModel.getAllAthletes();
    handleSuccessResponse(res, athletes, "Data atlet berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data atlet.");
  }
};

/**
 * Get athlete by ID
 */
exports.getAthleteById = async (req, res) => {
  const athleteId = req.params.id;
  try {
    const athlete = await AthleteModel.getAthleteById(athleteId);
    if (athlete.length === 0) {
      return handleErrorResponse(res, 404, "Atlet tidak ditemukan.");
    }
    handleSuccessResponse(res, athlete[0], "Data atlet berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data atlet.");
  }
};

/**
 * Create new athlete
 */
exports.createAthlete = async (req, res) => {
  const { name, team, martial, weight, height } = req.body;

  // Validasi input
  if (!name || !team || !martial || !weight || !height) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const newAthlete = await AthleteModel.createAthlete({ name, team, martial, weight, height });
    handleSuccessResponse(res, newAthlete, "Atlet berhasil ditambahkan.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan atlet.");
  }
};

/**
 * Update athlete by ID
 */
exports.updateAthlete = async (req, res) => {
  const athleteId = req.params.id;
  const { name, team, martial, weight, height } = req.body;

  // Validasi input
  if (!name || !team || !martial || !weight || !height) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const athlete = await AthleteModel.getAthleteById(athleteId);
    if (athlete.length === 0) {
      return handleErrorResponse(res, 404, "Atlet tidak ditemukan.");
    }

    await AthleteModel.updateAthlete(athleteId, { name, team, martial, weight, height });

    handleSuccessResponse(
      res,
      {
        id: athleteId,
        name,
        team,
        martial,
        weight,
        height,
        updated_at: new Date().toISOString(),
      },
      "Atlet berhasil diperbarui."
    );
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat memperbarui data atlet.");
  }
};

/**
 * Delete athlete by ID
 */
exports.deleteAthlete = async (req, res) => {
  const athleteId = req.params.id;

  try {
    const athlete = await AthleteModel.getAthleteById(athleteId);
    if (athlete.length === 0) {
      return handleErrorResponse(res, 404, "Atlet tidak ditemukan.");
    }

    await AthleteModel.deleteAthlete(athleteId);
    handleSuccessResponse(res, null, "Atlet berhasil dihapus.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menghapus data atlet.");
  }
}
