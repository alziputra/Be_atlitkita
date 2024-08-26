const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const athleteRoutes = require('./routes/athleteRoutes');


app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/athletes', athleteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
