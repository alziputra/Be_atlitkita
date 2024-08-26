const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
// Tambahkan routes lainnya di sini...

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/competitions', competitionRoutes);
// Tambahkan route lainnya di sini...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
