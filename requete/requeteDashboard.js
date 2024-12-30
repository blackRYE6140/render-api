const express = require('express');
const router = express.Router();
const db = require('../bd.config');

router.get('/countCli', (req, res) => {
    const sql = "SELECT COUNT(*) AS nb_clients FROM client";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Erreur lors de la connexion à la base de données");
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des clients" });
        } else {
            // Accédez aux données réelles dans le résultat de la requête
            const nb_clients = result[0].nb_clients;
            res.status(200).send({ status: true, data: nb_clients });
        }
    });
});



router.get('/countCh', (req, res) => {
    const sql = "SELECT COUNT(*) AS nb_chambres FROM chambre";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Erreur lors de la connexion à la base de données");
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des chambres" });
        } else {
            // Accédez aux données réelles dans le résultat de la requête
            const nb_chambres = result[0].nb_chambres;
            res.status(200).send({ status: true, data: nb_chambres });
        }
    });
});

router.get('/countRes', (req, res) => {
    const sql = "SELECT COUNT(*) AS nb_reservations FROM reservation";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Erreur lors de la connexion à la base de données");
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des reservations" });
        } else {
            // Accédez aux données réelles dans le résultat de la requête
            const nb_reservations = result[0].nb_reservations;
            res.status(200).send({ status: true, data: nb_reservations });
        }
    });
});

router.get('/countUt', (req, res) => {
    const sql = "SELECT COUNT(*) AS nb_utilisateurs FROM utilisateur";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Erreur lors de la connexion à la base de données");
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des reservations" });
        } else {
            const nb_utilisateurs = result[0].nb_utilisateurs;
            res.status(200).send({ status: true, data: nb_utilisateurs });
        }
    });
});


router.get('/nat', (req, res) => {
    const sql = "SELECT nationalite AS nat, COUNT(nationalite) AS nb_nat FROM client group by nationalite";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Erreur lors de la connexion à la base de données");
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des clients" });
        } else {
            res.status(200).send({ status: true, data: result});
        }
    });
});


router.get('/sum-by-month', (req, res) => {
    const sql = "SELECT CONCAT(LEFT(MONTHNAME(dateres), 3), ' ', YEAR(dateres)) AS month, SUM(prixtotal) AS total FROM reservation GROUP BY YEAR(dateres), MONTH(dateres)";
    db.query(sql, (error, results) => {
        if (error) {
            console.error("Erreur lors de la récupération des sommes par mois :", error);
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des sommes par mois" });
        } else {
            // Formatage des mois
            results.forEach((result) => {
                result.month = result.month.charAt(0).toUpperCase() + result.month.slice(1);
            });

            console.log("Sommes par mois récupérées avec succès :", results);
            res.status(200).send({ status: true, data: results });
        }
    });
});

router.get('/clientNbr-by-date', (req, res) => {
    const sql = `
         SELECT DATE_FORMAT(reservation.dateres, '%d %b %Y') AS date_reservation, COUNT(*) AS nombre_clients
         FROM reservation 
         GROUP BY DATE_FORMAT(reservation.dateres, '%d %b %Y') ORDER BY date_reservation DESC
    `;
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Erreur lors de la connexion à la base de données");
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des données" });
        } else {
            res.status(200).send({ status: true, data: result });
        }
    });
});

router.get('/dispoCh', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Obtenez la date actuelle au format 'YYYY-MM-DD'
    const sql = `
        SELECT COUNT(*) AS nb_chambres_disponibles FROM chambre WHERE numch NOT IN (
        SELECT numch FROM reservation WHERE (datearr BETWEEN ? AND ?) OR (datedep BETWEEN ? AND ?)
        ) AND datearr <= ? AND datedep >= ?
    `;
    db.query(sql, [currentDate, currentDate, currentDate, currentDate, currentDate, currentDate], (error, result) => {
        if (error) {
            console.log("Erreur lors de la connexion à la base de données :", error);
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des données" });
        } else {
            res.status(200).send({ status: true, data: result });
        }
    });
});


module.exports = router;
