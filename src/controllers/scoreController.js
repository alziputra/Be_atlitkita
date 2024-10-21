const ScoreModel = require("../models/scoreModel");
const { handleErrorResponse, handleSuccessResponse } = require("../utils/responseHandler");

/**
 * Get all scores
 */
exports.getAllScores = async (req, res) => {
  try {
    const scores = await ScoreModel.getAllScores();
    handleSuccessResponse(res, scores, "Data skor berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data skor.");
  }
};

/**
 * Get scores by match ID
 */
exports.getScoreById = async (req, res) => {
  const matchId = req.params.id;
  try {
    const scores = await ScoreModel.getScoreById(matchId);
    if (scores.length === 0) {
      return handleErrorResponse(res, 404, "Skor tidak ditemukan untuk pertandingan ini.");
    }
    handleSuccessResponse(res, scores, "Data skor berhasil diambil.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat mengambil data skor.");
  }
};

/**
 * Create new score
 */
exports.addScore = async (req, res) => {
  const { match_id, judge_id, athlete_id, kick_score, punch_score, elbow_score, knee_score, throw_score } = req.body;

  // Validasi input
  if (!match_id || !judge_id || !athlete_id) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  // Pastikan semua nilai skor valid
  if ([kick_score, punch_score, elbow_score, knee_score, throw_score].some((score) => typeof score !== "number")) {
    return handleErrorResponse(res, 400, "Semua skor harus berupa angka.");
  }

  try {
    // Tambahkan skor ke database
    const result = await ScoreModel.addScore({
      match_id,
      judge_id,
      athlete_id,
      kick_score,
      punch_score,
      elbow_score,
      knee_score,
      throw_score,
    });

    // Pastikan ID skor yang baru dibuat dikembalikan
    const insertedScoreId = result.insertId;

    // Kirim response sukses dengan data skor yang baru dibuat
    handleSuccessResponse(
      res,
      {
        score_id: insertedScoreId, // Sertakan scoreId dalam response
        match_id,
        judge_id,
        athlete_id,
        kick_score,
        punch_score,
        elbow_score,
        knee_score,
        throw_score,
        created_at: new Date().toISOString(),
      },
      "Skor berhasil ditambahkan."
    );
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menambahkan skor.");
  }
};

/**
 * Update score by ID
 */
exports.updateScore = async (req, res) => {
  const scoreId = req.params.id;
  const { kick_score, punch_score, elbow_score, knee_score, throw_score } = req.body;

  if (!kick_score || !punch_score || !elbow_score || !knee_score || !throw_score) {
    return handleErrorResponse(res, 400, "Field yang dibutuhkan tidak lengkap.");
  }

  try {
    await ScoreModel.updateScore(scoreId, { kick_score, punch_score, elbow_score, knee_score, throw_score });
    handleSuccessResponse(res, null, "Skor berhasil diperbarui.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat memperbarui skor.");
  }
};

/**
 * Delete score by ID
 */
exports.deleteScore = async (req, res) => {
  const scoreId = req.params.id;

  try {
    const result = await ScoreModel.deleteScore(scoreId);
    if (result.affectedRows === 0) {
      return handleErrorResponse(res, 404, "Skor tidak ditemukan.");
    }
    handleSuccessResponse(res, null, "Skor berhasil dihapus.");
  } catch (err) {
    handleErrorResponse(res, 500, "Terjadi kesalahan saat menghapus skor.");
  }
};
