const db = require("../config/db");

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mendapatkan semua kompetisi
exports.getAllCompetitions = async () => {
  try {
    const sql = `SELECT * FROM tb_competitions ORDER BY competition_date DESC`;
    const result = await query(sql, []);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan semua data kompetisi.");
  }
};

// Mendapatkan kompetisi berdasarkan ID
exports.getCompetitionById = async (competitionId) => {
  try {
    const sql = `SELECT * FROM tb_competitions WHERE competition_id = ?`;
    const result = await query(sql, [competitionId]);
    return result;
  } catch (err) {
    throw new Error("Gagal mendapatkan data kompetisi berdasarkan ID.");
  }
};

// Membuat kompetisi baru
exports.addCompetition = async (competitionData) => {
  try {
    const { competition_name, competition_date, status } = competitionData;

    const sql = `
      INSERT INTO tb_competitions (competition_name, competition_date, status) 
      VALUES (?, ?, ?)
    `;

    const result = await query(sql, [competition_name, competition_date, status]);
    return result;
  } catch (err) {
    throw new Error("Gagal membuat kompetisi baru.");
  }
};

// Memperbarui kompetisi
exports.updateCompetition = async (competitionId, competitionData) => {
  try {
    const { competition_name, competition_date, status } = competitionData;

    const sql = `
      UPDATE tb_competitions 
      SET competition_name = ?, competition_date = ?, status = ? 
      WHERE competition_id = ?
    `;

    const result = await query(sql, [competition_name, competition_date, status, competitionId]);
    return result;
  } catch (err) {
    throw new Error("Gagal memperbarui data kompetisi.");
  }
};

// Menghapus kompetisi berdasarkan ID
exports.deleteCompetition = async (competitionId) => {
  try {
    const sql = `DELETE FROM tb_competitions WHERE competition_id = ?`;
    const result = await query(sql, [competitionId]);
    return result;
  } catch (err) {
    throw new Error("Gagal menghapus kompetisi.");
  }
};
