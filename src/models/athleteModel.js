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

    // Kembalikan semua hasil dalam bentuk array
    return result;
  } catch (err) {
    throw err; // Lempar error agar bisa ditangani di controller
  }
};


// Mendapatkan atlet berdasarkan ID
exports.getAthleteById = async (athleteId) => {
  try {
    const sql = `SELECT * FROM tb_athletes WHERE athlete_id = ?`;
    const result = await query(sql, [athleteId]);

    // Jika hasil ditemukan, kembalikan atlet pertama (karena ID harus unik)
    return result.length > 0 ? result[0] : null;
  } catch (err) {
    throw err; // Lempar error agar bisa ditangani di controller
  }
};

// Menambahkan atlet baru
exports.addAthlete = async (athleteData) => {
  try {
    const { name, team, martial, weight, height } = athleteData;

    const sql = `
      INSERT INTO tb_athletes (name, team, martial, weight, height) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [name, team, martial, weight, height]);
    return result;
  } catch (err) {
    throw err; // lempar error agar bisa ditangani di controller
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
    throw err; // lempar error agar bisa ditangani di controller
  }
};

// Menghapus atlet berdasarkan ID
exports.deleteAthlete = async (athleteId) => {
  try {
    const sql = `DELETE FROM tb_athletes WHERE athlete_id = ?`;
    const result = await query(sql, [athleteId]);
    return result;
  } catch (err) {
    throw err; // lempar error agar bisa ditangani di controller
  }
};
