const db = require("../config/db");

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mendapatkan semua atlet
exports.getAllAthletes = async () => {
  try {
    const sql = `SELECT * FROM tb_athletes ORDER BY name ASC`;
    const result = await query(sql, []);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan semua data atlet.");
  }
};

// Mendapatkan atlet berdasarkan ID
exports.getAthleteById = async (athleteId) => {
  try {
    const sql = `SELECT * FROM tb_athletes WHERE athlete_id = ?`;
    const result = await query(sql, [athleteId]);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan data atlet berdasarkan ID.");
  }
};

// Membuat atlet baru
exports.createAthlete = async (athleteData) => {
  try {
    const { name, team, martial, weight, height } = athleteData;
    
    const sql = `
      INSERT INTO tb_athletes (name, team, martial, weight, height) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const result = await query(sql, [name, team, martial, weight, height]);
    return result;
  } catch (err) {
    throw new Error("Gagal membuat data atlet baru.");
  }
};

// Memperbarui data atlet
exports.updateAthlete = async (athleteId, athleteData) => {
  try {
    const { name, team, martial, weight, height } = athleteData;
    
    const sql = `
      UPDATE tb_athletes 
      SET name = ?, team = ?, martial = ?, weight = ?, height = ? 
      WHERE athlete_id = ?
    `;

    const result = await query(sql, [name, team, martial, weight, height, athleteId]);
    return result;
  } catch (err) {
    throw new Error("Gagal memperbarui data atlet.");
  }
};

// Menghapus atlet berdasarkan ID
exports.deleteAthlete = async (athleteId) => {
  try {
    const sql = `DELETE FROM tb_athletes WHERE athlete_id = ?`;
    const result = await query(sql, [athleteId]);
    return result;
  } catch (err) {
    throw new Error("Gagal menghapus data atlet.");
  }
};
