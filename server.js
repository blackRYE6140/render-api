const express = require('express');
const cors = require("cors");
const chambreRoutes = require('./requete/requeteChambre');
const clientRoutes = require('./requete/requeteClient');
const reservationRoutes = require('./requete/requeteReservation');
const loginRoutes = require('./requete/requeteLogin');
const dashboardRoutes = require('./requete/requeteDashboard');

const app = express();

var corsOptions = {
  origin: ['https://reservation-chambre.vercel.app/', 'http://localhost:4200'] 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/chambre', chambreRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

