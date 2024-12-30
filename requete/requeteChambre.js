const express = require('express');
const router = express.Router();
const db = require('../bd.config');

router.get('/', (req, res) => {
    const sql = " SELECT * FROM chambre ORDER BY numch DESC "
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Erreur lors de la connexion à la base de données");
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des chambres" });
        } else {
            res.status(200).send({ status: true, data: result });
        }
    });
});

router.post('/add', (req, res) => {
    const {numch, typech, nomch, nbrperso, prix} = req.body;
    const sql = "INSERT INTO chambre (numch, typech, nomch, nbrperso, prix) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [numch, typech, nomch, nbrperso, prix], (error, result) => {
        if (error) {
            console.error("Erreur lors de l'ajout de la chambre :", error);
            res.status(500).send({ status: false, message: "Erreur lors de l'ajout de la chambre" });
        } else {
            console.log("chambre ajouté avec succès");
            res.status(200).send({ status: true, message: "chambre ajouté avec succès" });
        }
    });
});

router.delete('/:id', (req, res) => {
    const chambreId = req.params.id;
    const sql = "DELETE FROM chambre WHERE numch = ?";
    db.query(sql, chambreId, (error, result) => {
        if (error) {
            console.error("Erreur lors de la suppression de la chambre :", error);
            res.status(500).send({ status: false, message: "Erreur lors de la suppression de la chambre" });
        } else {
            console.log("chambre supprimé avec succès");
            res.status(200).send({ status: true, message: "chambre supprimé avec succès" });
        }
    });
});

router.put('/:id', (req, res) => {
    const chambreId = req.params.id;
    const {typech, nomch, nbrperso, prix} = req.body;
    const sql = "UPDATE chambre SET typech = ?, nomch = ?, nbrperso = ?, prix = ? WHERE numch = ?";
    db.query(sql, [typech, nomch, nbrperso, prix, chambreId], (error, result) => {
        if (error) {
            console.error("Erreur lors de la modification de la chambre :", error);
            res.status(500).send({ status: false, message: "Erreur lors de la modification de la chambre" });
        } else {
            console.log("chambre modifié avec succès");
            res.status(200).send({ status: true, message: "chambre modifié avec succès" });
        }
    });
});

router.post("/search", (req, res) => {
    const recherche = req.body.recherche;
    console.log("Recherche chambre par mot-clé:", recherche);

    let sql = "SELECT * FROM chambre WHERE numch LIKE ? OR nomch LIKE ? OR typech LIKE ? OR nbrperso LIKE ? OR prix LIKE ?";
    db.query(sql, [`%${recherche}%`, `%${recherche}%`, `%${recherche}%`, `%${recherche}%`, `%${recherche}%`], (error, result) => {
        if (error) {
            console.error("Erreur lors de la recherche de la chambre :", error);
            res.status(500).send({ status: false, message: "Erreur lors de la recherche de la chambre" });
        } else {
            console.log("Résultats de la recherche :", result);
            res.status(200).send({ status: true, data: result });
        }
    });
});

module.exports = router;
