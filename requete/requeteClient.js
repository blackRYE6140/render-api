const express = require('express');
const router = express.Router();
const db = require('../bd.config');

router.get('/', (req, res) => {
    const sql = "SELECT * FROM client ORDER BY idcli DESC ";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Erreur lors de la connexion à la base de données");
            res.status(500).send({ status: false, message: "Erreur lors de la récupération des clients" });
        } else {
            res.status(200).send({ status: true, data: result });
        }
    });
});

router.post('/add', (req, res) => {
    const {typecli, nomcli, pieceidentite, numidentite, typecontact, contact, nationalite} = req.body;
    const sql = "INSERT INTO client (typecli, nomcli, pieceidentite, numidentite, typecontact, contact, nationalite) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [typecli, nomcli, pieceidentite, numidentite, typecontact, contact, nationalite], (error, result) => {
        if (error) {
            console.error("Erreur lors de l'ajout de le client :", error);
            res.status(500).send({ status: false, message: "Erreur lors de l'ajout de le client" });
        } else {
            console.log("client ajouté avec succès");
            res.status(200).send({ status: true, message: "client ajouté avec succès" });
        }
    });
});

router.delete('/:id', (req, res) => {
    const clientId = req.params.id;
    const sql = "DELETE FROM client WHERE idcli = ?";
    db.query(sql, clientId, (error, result) => {
        if (error) {
            console.error("Erreur lors de la suppression du client :", error);
            res.status(500).send({ status: false, message: "Erreur lors de la suppression du client" });
        } else {
            console.log("client supprimé avec succès");
            res.status(200).send({ status: true, message: "client supprimé avec succès" });
        }
    });
});

router.put('/:id', (req, res) => {
    const clientIdId = req.params.id;
    const {typecli, nomcli, pieceidentite, numidentite, typecontact, contact, nationalite} = req.body;
    const sql = "UPDATE client SET typecli = ?, nomcli = ?, pieceidentite = ?, numidentite = ?, typecontact = ?, contact = ?, nationalite = ? WHERE idcli = ?";
    db.query(sql, [typecli, nomcli, pieceidentite, numidentite, typecontact, contact, nationalite, clientIdId], (error, result) => {
        if (error) {
            console.error("Erreur lors de la modification du client :", error);
            res.status(500).send({ status: false, message: "Erreur lors de la modification du client" });
        } else {
            console.log("client modifié avec succès");
            res.status(200).send({ status: true, message: "client modifié avec succès" });
        }
    });
});

router.post("/search", (req, res) => {
    const recherche = req.body.recherche;
    console.log("Recherche client par mot-clé:", recherche);

    let sql = "SELECT * FROM client WHERE typecli LIKE ? OR nomcli LIKE ? OR pieceidentite LIKE ? OR numidentite LIKE ? OR typecontact LIKE ? OR contact LIKE ? OR nationalite LIKE ?";
    db.query(sql, [`%${recherche}%`, `%${recherche}%`, `%${recherche}%`, `%${recherche}%`, `%${recherche}%`, `%${recherche}%`, `%${recherche}%`], (error, result) => {
        if (error) {
            console.error("Erreur lors de la recherche du client :", error);
            res.status(500).send({ status: false, message: "Erreur lors de la recherche du client" });
        } else {
            console.log("Résultats de la recherche :", result);
            res.status(200).send({ status: true, data: result });
        }
    });
});

// Route to get client by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM client WHERE idcli = ?';
  
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: err.message });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ message: 'Client not found' });
        return;
      }
  
      res.status(200).json(results[0]);
    });
  });

module.exports = router;
