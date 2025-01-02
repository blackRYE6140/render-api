const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit: 10, // Nombre maximum de connexions
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// connection.connect((err) => {
//     if (err) {
//         console.log('Erreur de connexion à la base de données clever cloud', err);
//     } else {
//         console.log('Connecté à la base de données');
//     }
// });

module.exports = connection;
