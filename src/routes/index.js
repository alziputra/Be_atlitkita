const express = require('express');
const router = express.Router();

const routes = {
    users: require('./userRoutes'),
    competitions: require('./competitionRoutes'),
    athletes: require('./athleteRoutes'),
    results: require('./resultRoutes'),
    scores: require('./scoreRoutes')
};

// Menggunakan loop untuk mendaftarkan rute secara dinamis
for (const [routeName, routeHandler] of Object.entries(routes)) {
    router.use(`/${routeName}`, routeHandler);
}

module.exports = router;
