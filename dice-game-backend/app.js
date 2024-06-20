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
//Création d'une nouvelle session
app.post("/sessions", (req, res) => {
  const { creator, numDice, numGames, waitTime } = req.body;

  pool.query(
    "INSERT INTO sessions (creator) VALUES (?)",
    [creator],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la création de la session:", err);
        return res.status(500).json({ error: err.message });
      }

      const sessionId = results.insertId;

      pool.query(
        "INSERT INTO session_configs (session_id, num_dice, num_games, wait_time) VALUES (?, ?, ?, ?)",
        [sessionId, numDice, numGames, waitTime],
        (err) => {
          if (err) {
            console.error(
              "Erreur lors de la configuration de la session:",
              err
            );
            return res.status(500).json({ error: err.message });
          }

          res.status(201).json({
            sessionId,
            message: "Session créée et configurée avec succès",
          });
        }
      );
    }
  );
});
app.post("/games", (req, res) => {
  const { sessionId, playerId, score } = req.body;
  pool.query(
    "INSERT INTO games (session_id, player_id, score) VALUES (?, ?, ?)",
    [sessionId, playerId, score],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la création de la partie:", err);
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        gameId: results.insertId,
        message: "Partie créée avec succès",
      });
    }
  );
});
//Mettre à jour la session des la fin de celle ci
app.put("/sessions/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  pool.query(
    'UPDATE sessions SET end_date = NOW(), status = "inactive" WHERE id = ?',
    [sessionId],
    (err) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de la session:", err);
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json({ message: "Session terminée avec succès" });
    }
  );
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
        // Le joueur existe, renvoyer les détails
        res.status(200).json(results[0]);
      } else {
        // Le joueur n'existe pas
        res.status(404).json({ error: "Joueur non trouvé" });
      }
    }
  );
});

// Route pour vérifier et ajouter un nouveau joueur
app.post("/players", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Le nom du joueur est requis" });
  }

  // Vérifier si le joueur existe déjà
  pool.query("SELECT * FROM players WHERE name = ?", [name], (err, results) => {
    if (err) {
      console.error("Erreur lors de la vérification du joueur:", err);
      return res.status(500).json({ error: err.message });
    }

    if (Array.isArray(results) && results.length > 0) {
      // Le joueur existe déjà
      const player = results[0];
      res.status(200).json({
        message: `Bienvenue ${player.name}`,
        registrationDate: player.registration_date,
        existing: true,
      });
    } else {
      // Le joueur n'existe pas, ajoutons-le
      const currentDate = new Date();
      pool.query(
        "INSERT INTO players (name, registration_date) VALUES (?, ?)",
        [name, currentDate],
        (err, insertResults) => {
          if (err) {
            console.error("Erreur lors de l'ajout du joueur:", err);
            return res.status(500).json({ error: err.message });
          }

          // Récupérer le nombre total de joueurs
          pool.query(
            "SELECT COUNT(*) as count FROM players",
            (err, countResults) => {
              if (err) {
                console.error(
                  "Erreur lors de la récupération du nombre de joueurs:",
                  err
                );
                return res.status(500).json({ error: err.message });
              }

              const playerCount = countResults[0].count;
              res.status(201).json({
                message: `Bienvenue nouveau joueur`,
                playerCount: playerCount,
                existing: false,
              });
            }
          );
        }
      );
    }
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
