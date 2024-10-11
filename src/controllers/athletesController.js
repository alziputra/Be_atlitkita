const AthleteModel = require("../models/athleteModel");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Get all athletes
 */
exports.getAllAthletes = async (req, res) => {
  try {
    const athletes = await AthleteModel.getAllAthletes();

    // Jika tidak ada data atlet ditemukan
    if (athletes.length === 0) {
      return handleSuccessResponse(res, [], "Tidak ada data atlet yang tersedia.");
    }

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

    if (!athlete) {
      return handleErrorResponse(res, 404, "Atlet tidak ditemukan.");
    }

    handleSuccessResponse(res, athlete, "Data atlet berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data atlet.");
  }
};

/**
 * Add new athlete
 */
exports.addAthlete = async (req, res) => {
  const { name, team, martial, weight, height } = req.body;

  // Validasi input
  if (!name || !team || !martial || !weight || !height) {
    return handleErrorResponse(res, 400, "Semua field wajib diisi.");
  }

  try {
    // Tambahkan atlet ke database
    const result = await AthleteModel.addAthlete({ name, team, martial, weight, height });

    // Pastikan ID atlet yang baru dibuat dikembalikan
    const insertedAthleteId = result.insertId;

    // Kirim response sukses dengan data atlet yang baru dibuat
    handleSuccessResponse(
      res,
      {
        athlete_id: insertedAthleteId, // Sertakan athleteId dalam response
        name,
        team,
        martial,
        weight,
        height,
        created_at: new Date().toISOString(),
      },
      "Atlet berhasil ditambahkan."
    );
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
    return handleErrorResponse(res, 400, "Semua field wajib diisi.");
  }

  // Validasi data numerik (weight dan height)
  if (isNaN(weight) || isNaN(height)) {
    return handleErrorResponse(res, 400, "Berat dan tinggi harus berupa angka.");
  }

  try {
    const athlete = await AthleteModel.getAthleteById(athleteId);

    if (!athlete || athlete.length === 0) {
      return handleErrorResponse(res, 404, "Atlet tidak ditemukan.");
    }

    // Update athlete data
    await AthleteModel.updateAthlete(athleteId, { name, team, martial, weight, height });

    // Kirim response sukses dengan data yang diperbarui
    handleSuccessResponse(
      res,
      {
        athlete_id: athleteId,
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
    // Jika terjadi error, tangani dan kirimkan pesan error ke client
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
    // Periksa jika error karena Foreign Key Constraint
    if (err.code === "ER_ROW_IS_REFERENCED_2") {
      // Menambahkan detail pesan error tentang tabel yang terkait
      return handleErrorResponse(res, 400, "Gagal menghapus atlet. Data terkait masih ada di tabel lain.");
    }

    // Jika error lain, tampilkan pesan umum
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menghapus data atlet.");
  }
};
