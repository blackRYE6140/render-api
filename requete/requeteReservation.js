const express = require('express');
const router = express.Router();
const db = require('../bd.config');

router.get('/', (req, res) => {
    const sql = `
        SELECT cl.idcli, cl.nomcli, reservation.numch, reservation.idres, reservation.dateres, reservation.datearr, reservation.datedep, reservation.avance, reservation.prixres, reservation.prixtotal, reservation.etat
        FROM reservation 
        INNER JOIN client cl ON reservation.idcli = cl.idcli
    `;
    // const sql = "SELECT * FROM reservation";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Erreur lors de la connexion à la base de données");
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des données" });
        } else {
            res.status(200).send({ status: true, data: result });
        }
    });
});





router.post('/add', (req, res) => {
    const { idcli, numch, dateres, datearr, datedep, avance, prixres, prixtotal, etat } = req.body;
    console.log(req.body);
    const numchJSON = JSON.stringify(numch);
    const sql = "INSERT INTO reservation (idcli, numch, dateres, datearr, datedep, avance, prixres, prixtotal, etat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [idcli, numchJSON, dateres, datearr, datedep, avance, prixres, prixtotal, etat], (error, result) => {
        if (error) {
            console.error("Erreur lors de l'ajout de la reservation :", error);
            res.status(500).send({ status: false, message: "Erreur lors de l'ajout de la reservation" });
        } else {
            console.log("reservation ajouté avec succès");
            res.status(200).send({ status: true, message: "reservation ajouté avec succès" });
        }
    });
});

router.delete('/:id', (req, res) => {
    const reservationId = req.params.id;
    const sql = "DELETE FROM reservation WHERE idres = ?";
    db.query(sql, reservationId, (error, result) => {
        if (error) {
            console.error("Erreur lors de la suppression de la reservation :", error);
            res.status(500).send({ status: false, message: "Erreur lors de la suppression de la reservation" });
        } else {
            console.log("reservation supprimé avec succès");
            res.status(200).send({ status: true, message: "reservation supprimé avec succès" });
        }
    });
});

router.put('/:id', (req, res) => {
    const reservationId = req.params.id;
    const { idcli, numch, dateres, datearr, datedep, avance, prixres, prixtotal, etat } = req.body;

    // Log the received data for debugging
    console.log('Received data for update:', { idcli, numch, dateres, datearr, datedep, avance, prixres, prixtotal, etat, reservationId });

    // Convertir numch en tableau JavaScript si c'est une chaîne JSON
    const numchArray = Array.isArray(numch) ? numch : JSON.parse(numch);

    // Convertir le tableau JavaScript en chaîne JSON
    const numchString = JSON.stringify(numchArray);

    const sql = `
        UPDATE reservation 
        SET idcli = ?, numch = ?, dateres = ?, datearr = ?, datedep = ?, avance = ?, prixres = ?, prixtotal = ?, etat = ? 
        WHERE idres = ?
    `;

    db.query(sql, [idcli, numchString, dateres, datearr, datedep, avance, prixres, prixtotal, etat, reservationId], (error, result) => {
        if (error) {
            console.error('Erreur lors de la mise à jour de la réservation :', error);
            return res.status(500).send({ status: false, message: 'Erreur lors de la mise à jour de la réservation' });
        } else {
            console.log('Réservation mise à jour avec succès :', result);
            return res.status(200).send({ status: true, message: 'Réservation mise à jour avec succès' });
        }
    });
});





router.post("/search", (req, res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    console.log("Recherche des réservations entre les dates:", startDate, "et", endDate);

    let sql = `
        SELECT cl.idcli, cl.nomcli, reservation.numch, reservation.idres, reservation.dateres, reservation.datearr, reservation.datedep, reservation.avance, reservation.prixres, reservation.prixtotal, reservation.etat
        FROM reservation 
        INNER JOIN client cl ON reservation.idcli = cl.idcli
        WHERE (reservation.datearr BETWEEN ? AND ?) 
        OR (reservation.datearr <= ? AND reservation.datedep > ?)
    `;
    db.query(sql, [startDate, endDate, startDate, endDate], (error, result) => {
        if (error) {
            console.error("Erreur lors de la recherche de la reservation :", error);
            res.status(500).send({ status: false, message: "Erreur lors de la recherche de la reservation" });
        } else {
            console.log("Résultats de la recherche :", result);
            res.status(200).send({ status: true, data: result });
        }
    });
});




module.exports = router;
