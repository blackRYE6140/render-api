const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BDNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.connect((err) => {
    if (err) {
        console.log('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connecté à la base de données');
    }
});

module.exports = connection;
