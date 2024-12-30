const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'bbk7ufx7dc5w3wtai7ms-mysql.services.clever-cloud.com',
    user: 'ul0korm52weekxlv',
    password: 'gDqmPonPeVSdwlfouC0V',
    database: 'bbk7ufx7dc5w3wtai7ms',
    ssl: {
        rejectUnauthorized: true
    }
});

connection.connect((err) => {
    if (err) {
        console.log('Erreur de connexion à la base de données clever cloud', err);
    } else {
        console.log('Connecté à la base de données');
    }
});

module.exports = connection;
