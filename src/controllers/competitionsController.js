const CompetitionModel = require("../models/competitionModel");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Get all competitions
 */
exports.getAllCompetitions = async (req, res) => {
  try {
    const competitions = await CompetitionModel.getAllCompetitions();
    handleSuccessResponse(res, competitions, "Data kompetisi berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data kompetisi.");
  }
};

/**
 * Get competition by ID
 */
exports.getCompetitionById = async (req, res) => {
  const competitionId = req.params.id;
  try {
    const competition = await CompetitionModel.getCompetitionById(competitionId);
    if (competition.length === 0) {
      return handleErrorResponse(res, 404, "Kompetisi tidak ditemukan.");
    }
    handleSuccessResponse(res, competition[0], "Data kompetisi berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data kompetisi.");
  }
};

/**
 * Add new competition
 */
exports.addCompetition = async (req, res) => {
  const { competition_name, location, competition_date, status } = req.body;

  // Validasi input
  if (!competition_name || !location || !competition_date || !status) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const newCompetitionId = await CompetitionModel.addCompetition({
      competition_name,
      location,
      competition_date,
      status,
    });

    // Dapatkan data kompetisi baru yang telah ditambahkan untuk dikirim ke frontend
    const newCompetition = {
      competition_id: newCompetitionId.insertId, // Gunakan insertId dari database
      competition_name,
      location,
      competition_date,
      status,
    };

    handleSuccessResponse(res, newCompetition, "Kompetisi berhasil ditambahkan.");
  } catch (error) {
    console.error("Kesalahan saat menambahkan kompetisi:", error);
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan kompetisi.");
  }
};

/**
 * Update competition by ID
 */
exports.updateCompetition = async (req, res) => {
  const competitionId = req.params.id;
  const { competition_name, location, competition_date, status } = req.body;

  // Validasi input
  if (!competition_name || !location || !competition_date || !status) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    const competition = await CompetitionModel.getCompetitionById(competitionId);
    if (competition.length === 0) {
      return handleErrorResponse(res, 404, "Kompetisi tidak ditemukan.");
    }

    await CompetitionModel.updateCompetition(competitionId, { competition_name, location, competition_date, status });

    handleSuccessResponse(
      res,
      {
        id: competitionId,
        competition_name,
        location,
        competition_date,
        status,
        updated_at: new Date().toISOString(),
      },
      "Kompetisi berhasil diperbarui."
    );
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat memperbarui kompetisi.");
  }
};

/**
 * Delete competition by ID
 */
exports.deleteCompetition = async (req, res) => {
  const competitionId = req.params.id;

  try {
    const result = await CompetitionModel.deleteCompetition(competitionId);
    if (result.affectedRows === 0) {
      return handleErrorResponse(res, 404, "Kompetisi tidak ditemukan.");
    }
    handleSuccessResponse(res, null, "Kompetisi berhasil dihapus.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menghapus kompetisi.");
  }
};
