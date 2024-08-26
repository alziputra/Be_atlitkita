// import result model
const ResultModel = require('../models/resultModel');

// get all results
exports.getAllResults = async (req, res) => {
    try {
        const results = await ResultModel.getAllResults();
        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database query error' });
    }
};

// get result by id
exports.getResultById = async (req, res) => {
    try {
        const result = await ResultModel.getResultById(req.params.id);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database query error' });
    }
};

// create result
exports.createResult = async (req, res) => {
    try {
        const result = await ResultModel.createResult(req.body);
        res.status(201).json({ id: result.insertId, message: 'Result created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database query error' });
    }
};

// update result
exports.updateResult = async (req, res) => {
    try {
        const result = await ResultModel.updateResult(req.params.id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.json({ message: 'Result updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database query error' });
    }
};

// delete result
exports.deleteResult = async (req, res) => {
    try {
        const result = await ResultModel.deleteResult(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.json({ message: 'Result deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Database query error' });
    }
};
