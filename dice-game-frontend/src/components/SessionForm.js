import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SessionForm = () => {
  const [numDice, setNumDice] = useState("");
  const [numGames, setNumGames] = useState("");
  const [waitTime, setWaitTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Réinitialiser les messages d'erreur et de succès
    setError("");
    setSuccess("");

    try {
      // Récupère idSession depuis le localStorage
      const idsession = JSON.parse(localStorage.getItem("idSession"));
      await axios.post(
        "http://localhost:8000/api/create_session/",
        {
          session_id: idsession,
          num_dice: parseInt(numDice),
          num_games: parseInt(numGames),
          wait_time: parseInt(waitTime),
        },
        {
          withCredentials: true, // Assure que les cookies de session sont envoyés avec la requête
        }
      );
      setSuccess("Session créée avec succès !");
      navigate("/start-game"); // Redirige l'utilisateur vers une autre page
    } catch (error) {
      setError("Erreur lors de la création de la session.");
      console.error("Il y a eu un problème avec la requête:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Créer une Nouvelle Session de Jeu</h2>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <div className="form-group mb-3">
              <label htmlFor="numDice">Nombre de Dés</label>
              <input
                type="number"
                className="form-control"
                id="numDice"
                value={numDice}
                onChange={(e) => setNumDice(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="numGames">Nombre de Jeux</label>
              <input
                type="number"
                className="form-control"
                id="numGames"
                value={numGames}
                onChange={(e) => setNumGames(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="waitTime">Temps d'Attente (en secondes)</label>
              <input
                type="number"
                className="form-control"
                id="waitTime"
                value={waitTime}
                onChange={(e) => setWaitTime(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}
            <button type="submit" className="btn btn-secondary w-100">
              Créer la Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SessionForm;
