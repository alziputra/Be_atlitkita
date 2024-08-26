const UserModel = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.getUserById(userId);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await UserModel.getUserByUsername(username);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Data sudah ada' });
    }

    // Create new user
    const result = await UserModel.createUser({ username, password, role });
    res.status(201).json({ message: 'Data berhasil ditambah', id: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists
    const existingUser = await UserModel.getUserById(userId);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user
    await UserModel.updateUser(userId, { username, password, role });
    res.json({ message: 'Data berhasil diupdate' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const existingUser = await UserModel.getUserById(userId);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user
    await UserModel.deleteUser(userId);
    res.json({ message: 'Data berhasil dihapus' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query error' });
  }
};
