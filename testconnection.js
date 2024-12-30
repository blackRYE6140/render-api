const connection = require('./bd.config'); // Assurez-vous que le chemin est correct

// Fonction de test pour vérifier la connexion
async function testConnection() {
    try {
        // Effectuer une requête pour obtenir la liste des bases de données
        connection.query('SHOW DATABASES;', (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des bases de données:', err);
            } else {
                console.log('Bases de données existantes :');
                results.forEach((db) => {
                    console.log(db.Database); // Affiche chaque base de données
                });
            }
        });
    } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
    }
}

testConnection(); // Appeler la fonction pour tester la connexion
