const db = require("../config/db");

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Mendapatkan hasil akhir pertandingan berdasarkan ID pertandingan
exports.getResultsByMatchId = async (matchId) => {
  const sql = `
    SELECT r.*, a1.name AS athlete1_name, a2.name AS athlete2_name, a3.name AS winner_name 
    FROM tb_results r
    JOIN tb_matches m ON r.match_id = m.match_id
    JOIN tb_athletes a1 ON m.athlete1_id = a1.athlete_id
    JOIN tb_athletes a2 ON m.athlete2_id = a2.athlete_id
    LEFT JOIN tb_athletes a3 ON r.winner_id = a3.athlete_id
    WHERE r.match_id = ?
  `;
  return await query(sql, [matchId]);
};

// Membuat hasil baru berdasarkan skor dari tb_scores
exports.createResult = async (matchId) => {
  try {
    // Mengambil skor dari tb_scores untuk kedua atlet dalam satu pertandingan
    const sql = `
      SELECT athlete_id, SUM(kick_score + punch_score + elbow_score + knee_score + throw_score) AS total_score
      FROM tb_scores 
      WHERE match_id = ? 
      GROUP BY athlete_id
    `;
    const scores = await query(sql, [matchId]);

    if (scores.length !== 2) {
      throw new Error("Skor untuk kedua atlet belum lengkap.");
    }

    // Mendapatkan skor untuk kedua atlet
    const athlete1_final_score = scores[0].total_score;
    const athlete2_final_score = scores[1].total_score;

    // Menentukan pemenang berdasarkan skor tertinggi
    let winner_id = null;
    if (athlete1_final_score > athlete2_final_score) {
      winner_id = scores[0].athlete_id;
    } else if (athlete2_final_score > athlete1_final_score) {
      winner_id = scores[1].athlete_id;
    }

    // Menyimpan hasil ke tb_results
    const insertSql = `
      INSERT INTO tb_results (match_id, athlete1_final_score, athlete2_final_score, winner_id)
      VALUES (?, ?, ?, ?)
    `;
    return await query(insertSql, [matchId, athlete1_final_score, athlete2_final_score, winner_id]);
  } catch (err) {
    throw new Error("Gagal membuat hasil pertandingan.");
  }
};

// Memperbarui hasil pertandingan berdasarkan ID pertandingan
exports.updateResult = async (resultId, resultData) => {
  const { athlete1_final_score, athlete2_final_score, winner_id } = resultData;
  const sql = `
    UPDATE tb_results 
    SET athlete1_final_score = ?, athlete2_final_score = ?, winner_id = ? 
    WHERE result_id = ?
  `;
  return await query(sql, [athlete1_final_score, athlete2_final_score, winner_id, resultId]);
};

// Menghapus hasil pertandingan berdasarkan ID hasil
exports.deleteResult = async (resultId) => {
  const sql = `DELETE FROM tb_results WHERE result_id = ?`;
  return await query(sql, [resultId]);
};
