const AthleteModel = require("../models/athleteModel");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Get all athletes
 */
exports.getAllAthletes = async (req, res) => {
  try {
    const athletes = await AthleteModel.getAllAthletes();
    if (athletes.length > 0) {
      handleSuccessResponse(res, athletes, "Data atlet berhasil diambil.");
    } else {
      handleSuccessResponse(res, [], "Tidak ada atlet yang ditemukan.");
    }
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
  const { name } = req.body;

  if (!name) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    // Cek apakah atlet dengan nama yang sama sudah ada
    const existingAthleteByName = await AthleteModel.getAthleteByName(name);
    if (existingAthleteByName.length > 0) {
      return handleErrorResponse(res, 400, "Atlet dengan nama ini sudah ada.");
    }

    const result = await AthleteModel.createAthlete(req.body);
    const newAthleteData = {
      id: result.insertId,
      name,
      created_at: new Date().toISOString(),
    };

    handleSuccessResponse(res, newAthleteData, "Atlet berhasil ditambahkan.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan atlet.");
  }
};

/**
 * Update athlete by ID
 */
exports.updateAthlete = async (req, res) => {
  const athleteId = req.params.id;
  const { name } = req.body;

  if (!name) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    // Cek apakah atlet dengan nama yang sama sudah ada, dan pastikan bukan atlet yang sedang diperbarui
    const existingAthleteByName = await AthleteModel.getAthleteByName(name);
    if (existingAthleteByName.length > 0 && existingAthleteByName[0].athlete_id !== parseInt(athleteId, 10)) {
      return handleErrorResponse(res, 400, "Atlet dengan nama ini sudah ada.");
    }

    const result = await AthleteModel.updateAthlete(athleteId, req.body);
    if (result.affectedRows === 0) {
      return handleErrorResponse(res, 404, "Atlet tidak ditemukan.");
    }

    handleSuccessResponse(res, null, "Atlet berhasil diperbarui.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat memperbarui atlet.");
  }
};

/**
 * Delete athlete by ID
 */
exports.deleteAthlete = async (req, res) => {
  const athleteId = req.params.id;

  try {
    const result = await AthleteModel.deleteAthlete(athleteId);
    if (result.affectedRows === 0) {
      return handleErrorResponse(res, 404, "Atlet tidak ditemukan.");
    }

    handleSuccessResponse(res, null, "Atlet berhasil dihapus.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menghapus atlet.");
  }
};
