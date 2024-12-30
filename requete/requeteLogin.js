const express = require('express');
const router = express.Router();
const db = require('../bd.config');

router.post('/auth', (req, res) => {
 const { username, password } = req.body;
 const sql = "SELECT * FROM utilisateur WHERE nomut = ? AND mdp = ?";
 db.query(sql, [username, password], (error, result) => {
     if (error) {
         console.log("Erreur lors de la connexion à la base de données");
         res.status(500).send({ status: false, message: "Erreur lors de la connexion" });
     } else {
         if (result.length > 0) {
             res.status(200).send({ status: true, message: "Connexion réussie", user: result[0] });
         } else {
             res.send({ message: "Nom d'utilisateur ou mot de passe incorrect" });
         }
     }
 });
});


module.exports = router;
