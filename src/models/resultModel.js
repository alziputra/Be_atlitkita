const db = require('../config/db');

// Get all results
exports.getAllResults = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_results', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Get result by ID
exports.getResultById = (resultId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tb_results WHERE result_id = ?', [resultId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Create new result
exports.createResult = (resultData) => {
    const { competition_id, athlete_id, score, rank } = resultData;
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO tb_results (competition_id, athlete_id, score, rank) VALUES (?, ?, ?, ?)',
            [competition_id, athlete_id, score, rank],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// Update result
exports.updateResult = (resultId, resultData) => {
    const { competition_id, athlete_id, score, rank } = resultData;
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE tb_results SET competition_id = ?, athlete_id = ?, score = ?, rank = ? WHERE result_id = ?',
            [competition_id, athlete_id, score, rank, resultId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// Delete result
exports.deleteResult = (resultId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM tb_results WHERE result_id = ?', [resultId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};
