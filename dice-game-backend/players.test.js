const request = require("supertest");
const { app, pool } = require("./app"); // Importer `app` et `pool` depuis `app.js`

describe("Player Routes", () => {
  // Avant chaque test, assurez-vous que la table `players` est vide
  beforeEach((done) => {
    // Réinitialiser les données pour chaque test
    pool.query("DELETE FROM players", (err) => {
      if (err) {
        console.error(
          "Erreur lors de la réinitialisation de la table players:",
          err
        );
        done(err);
      } else {
        done();
      }
    });
  });

  afterAll((done) => {
    pool.end((err) => {
      if (err) {
        console.error(
          "Erreur lors de la fermeture de la connexion à la base de données:",
          err
        );
        done(err);
      } else {
        done();
      }
    });
  });

  // Test pour récupérer les détails d'un joueur
  describe("GET /players/:name", () => {
    test("Retourne des informations sur les joueurs", async () => {
      // Ajouter un joueur pour le test
      await new Promise((resolve, reject) => {
        pool.query(
          "INSERT INTO players (name, registration_date) VALUES (?, ?)",
          ["Player1", new Date()],
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });

      const response = await request(app).get("/players/Player1");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "Player1");
      expect(response.body).toHaveProperty("registration_date");
    });

    test("Retourne une erreur pour les joueurs non existants", async () => {
      const response = await request(app).get("/players/NonExistentPlayer");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Joueur non trouvé");
    });
  });

  // Test pour enregistrer un nouveau joueur
  describe("POST /players", () => {
    test("Test pour ajouter un nouveau joueur", async () => {
      const response = await request(app)
        .post("/players")
        .send({ name: "NewPlayer" });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Bienvenue nouveau joueur");
      expect(response.body).toHaveProperty("playerCount");
    });

    test("Retourne une erreur si le joueur n'existe pas", async () => {
      const response = await request(app).post("/players").send({}); // Ne pas envoyer de nom de joueur

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Le nom du joueur est requis"
      );
    });

    test("Retourne une message si le joueur existe déjà", async () => {
      // Ajouter un joueur pour ce test
      await new Promise((resolve, reject) => {
        pool.query(
          "INSERT INTO players (name, registration_date) VALUES (?, ?)",
          ["ExistingPlayer", new Date()],
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });

      const response = await request(app)
        .post("/players")
        .send({ name: "ExistingPlayer" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Bienvenue ExistingPlayer");
      expect(response.body).toHaveProperty("registrationDate");
      expect(response.body).toHaveProperty("existing", true);
    });
  });
});
