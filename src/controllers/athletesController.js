const athleteModel = require('../models/athleteModel');

// Get all athletes
exports.getAllAthletes = async (req, res) => {
  try {
    const athletes = await athleteModel.getAllAthletes();
    res.json(athletes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Get athlete by ID
exports.getAthleteById = async (req, res) => {
  try {
    const athleteId = req.params.id;
    const athlete = await athleteModel.getAthleteById(athleteId);
    if (athlete.length === 0) {
      return res.status(404).json({ message: 'Athlete not found' });
    }
    res.json(athlete);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Create new athlete
exports.createAthlete = async (req, res) => {
  try {
    const { athlete_name, athlete_dob, athlete_country } = req.body;
    if (!athlete_name || !athlete_dob || !athlete_country) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create new athlete
    const result = await athleteModel.createAthlete({ athlete_name, athlete_dob, athlete_country });
    res.status(201).json({ message: 'Athlete created successfully', id: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Update athlete
exports.updateAthlete = async (req, res) => {
  try {
    const athleteId = req.params.id;
    const { athlete_name, athlete_dob, athlete_country } = req.body;
    if (!athlete_name || !athlete_dob || !athlete_country) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await athleteModel.updateAthlete(athleteId, { athlete_name, athlete_dob, athlete_country });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Athlete not found' });
    }

    res.json({ message: 'Athlete updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Delete athlete
exports.deleteAthlete = async (req, res) => {
  try {
    const athleteId = req.params.id;
    const result = await athleteModel.deleteAthlete(athleteId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Athlete not found' });
    }

    res.json({ message: 'Athlete deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};