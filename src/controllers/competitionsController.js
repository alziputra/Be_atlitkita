const CompetitionModel = require('../models/competitionModel');

// Get all competitions
exports.getAllCompetitions = async (req, res) => {
  try {
    const [results] = await CompetitionModel.getAllCompetitions();
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Get competition by ID
exports.getCompetitionById = async (req, res) => {
  try {
    const competitionId = req.params.id;
    const [result] = await CompetitionModel.getCompetitionById(competitionId);
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Create new competition
exports.createCompetition = async (req, res) => {
  try {
    const { competition_name, competition_date, status } = req.body;
    
    const [result] = await CompetitionModel.createCompetition({ competition_name, competition_date, status });
    
    res.status(201).json({ id: result.insertId, message: 'Competition created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Update competition
exports.updateCompetition = async (req, res) => {
  try {
    const competitionId = req.params.id;
    const { competition_name, competition_date, status } = req.body;

    const [result] = await CompetitionModel.updateCompetition(competitionId, { competition_name, competition_date, status });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    res.json({ message: 'Competition updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Delete competition
exports.deleteCompetition = async (req, res) => {
  try {
    const competitionId = req.params.id;

    const [result] = await CompetitionModel.deleteCompetition(competitionId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    res.json({ message: 'Competition deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};
