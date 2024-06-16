const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

// Créer une application Express
const app = express();

// Utiliser CORS pour permettre les requêtes depuis le frontend
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Créer une pool de connexions à la base de données
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dice_game",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Route pour ajouter un nouveau joueur
app.post("/players", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Le nom du joueur est requis" });
  }

  // Insérer le nouveau joueur dans la base de données
  pool.query("INSERT INTO players SET ?", { name }, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'ajout du joueur:", err);
      return res.status(500).json({ error: err.message });
    }

    // Renvoyer une réponse de succès sans l'ID du joueur inséré
    res.status(201).json({ name: name });
  });
});
// Route pour récupérer les détails d'un joueur par son nom
app.get("/players/:name", (req, res) => {
  const playerName = req.params.name;

  pool.query(
    "SELECT * FROM players WHERE name = ?",
    [playerName],
    (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération des détails du joueur:",
          err
        );
        return res.status(500).json({ error: err.message });
      }

      if (results) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: "Joueur non trouvé" });
      }
    }
  );
});
// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
