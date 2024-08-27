// import athlete model
const AthleteModel = require('../models/athleteModel');

// get all athletes
exports.getAllAthletes = async (req, res) => {
  try {
    const [athletes] = await AthleteModel.getAllAthletes();
    res.json(athletes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// get athlete by id
exports.getAthleteById = async (req, res) => {
  try {
    const [athlete] = await AthleteModel.getAthleteById(req.params.id);
    if (athlete.length === 0) {
      return res.status(404).json({ message: 'Athlete not found' });
    }
    res.json(athlete);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// create new athlete
exports.createAthlete = async (req, res) => {
  try {
    const { name } = req.body;

    // Cek apakah atlet dengan nama yang sama sudah ada
    const [existingAthleteByName] = await AthleteModel.getAthleteByName(name);
    if (existingAthleteByName.length > 0) {
      return res.status(400).json({ message: 'Data already exists' });
    }

    const result = await AthleteModel.createAthlete(req.body);
    res.status(201).json({ id: result.insertId, message: 'Athlete created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// update athlete
exports.updateAthlete = async (req, res) => {
  try {
    const { name } = req.body;

    // Cek apakah atlet dengan nama yang sama sudah ada, dan pastikan itu bukan atlet yang sedang diperbarui
    const [existingAthleteByName] = await AthleteModel.getAthleteByName(name);
    if (existingAthleteByName.length > 0 && existingAthleteByName[0].athlete_id !== parseInt(req.params.id, 10)) {
      return res.status(400).json({ message: 'Data already exists' });
    }

    const result = await AthleteModel.updateAthlete(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Athlete not found' });
    }
    res.json({ message: 'Athlete updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// delete athlete
exports.deleteAthlete = async (req, res) => {
  try {
    const result = await AthleteModel.deleteAthlete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Athlete not found' });
    }
    res.json({ message: 'Athlete deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};
