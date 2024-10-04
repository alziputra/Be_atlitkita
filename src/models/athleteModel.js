const db = require("../config/db");

// Wrapper untuk query database menggunakan Promise
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mendapatkan semua data atlet
exports.getAllAthletes = async () => {
  try {
    const sql = "SELECT * FROM tb_athletes";
    const result = await query(sql, []);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan semua data atlet.");
  }
};

// Mendapatkan atlet berdasarkan ID
exports.getAthleteById = async (athleteId) => {
  try {
    const sql = "SELECT * FROM tb_athletes WHERE athlete_id = ?";
    const result = await query(sql, [athleteId]);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan data atlet berdasarkan ID.");
  }
};

// Mendapatkan atlet berdasarkan nama
exports.getAthleteByName = async (name) => {
  try {
    const sql = "SELECT * FROM tb_athletes WHERE name = ?";
    const result = await query(sql, [name]);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan data atlet berdasarkan nama.");
  }
};

// Membuat atlet baru
exports.createAthlete = async (athleteData) => {
  try {
    const { name, team, martial, weight, height } = athleteData;

    // Pastikan data yang dibutuhkan sudah lengkap
    if (!name || !team || !martial || !weight || !height) {
      throw new Error("Field yang dibutuhkan tidak lengkap.");
    }

    // Memeriksa apakah atlet dengan nama yang sama sudah ada
    const existingAthlete = await this.getAthleteByName(name);
    if (existingAthlete.length > 0) {
      throw new Error("Atlet dengan nama ini sudah ada.");
    }

    const sql = "INSERT INTO tb_athletes (name, team, martial, weight, height) VALUES (?, ?, ?, ?, ?)";
    const result = await query(sql, [name, team, martial, weight, height]);
    return result;
  } catch (err) {
    throw new Error("Gagal membuat atlet baru.");
  }
};

// Memperbarui data atlet berdasarkan ID
exports.updateAthlete = async (athleteId, athleteData) => {
  try {
    const { name, team, martial, weight, height } = athleteData;

    // Memeriksa apakah atlet ada
    const existingAthlete = await this.getAthleteById(athleteId);
    if (existingAthlete.length === 0) {
      throw new Error("Atlet tidak ditemukan.");
    }

    const sql = "UPDATE tb_athletes SET name = ?, team = ?, martial = ?, weight = ?, height = ? WHERE athlete_id = ?";
    const result = await query(sql, [name, team, martial, weight, height, athleteId]);
    return result;
  } catch (err) {
    throw new Error("Gagal memperbarui data atlet.");
  }
};

// Menghapus atlet berdasarkan ID
exports.deleteAthlete = async (athleteId) => {
  try {
    // Memeriksa apakah atlet ada
    const athlete = await this.getAthleteById(athleteId);
    if (athlete.length === 0) {
      throw new Error("Atlet tidak ditemukan.");
    }

    const sql = "DELETE FROM tb_athletes WHERE athlete_id = ?";
    const result = await query(sql, [athleteId]);
    return result;
  } catch (err) {
    throw new Error("Gagal menghapus data atlet.");
  }
};
