import React, { useState, useEffect } from "react";
import axios from "axios";
import dice1 from "../assets/images/dice-face-1.png";
import dice2 from "../assets/images/dice-face-2.png";
import dice3 from "../assets/images/dice-face-3.png";
import dice4 from "../assets/images/dice-face-4.png";
import dice5 from "../assets/images/dice-face-5.png";
import dice6 from "../assets/images/dice-face-6.png";

const dices = [dice1, dice2, dice3, dice4, dice5, dice6];

function DiceGame({ playerName }) {
  const [diceValue, setDiceValue] = useState(1);
  const [playerDetails, setPlayerDetails] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [games, setGames] = useState([]);
  const [partieNumero, setPartieNumero] = useState(0);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/players/${playerName}`
        );
        setPlayerDetails(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du joueur:",
          error
        );
      }
    };

    const createSession = async () => {
      try {
        const response = await axios.post("http://localhost:3001/sessions", {
          creator: playerName,
        });
        setSessionId(response.data.sessionId);
      } catch (error) {
        console.error("Erreur lors de la création de la session:", error);
      }
    };

    if (playerName) {
      fetchPlayerDetails();
      createSession();
    }
  }, [playerName]);

  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);
    const game = {
      sessionId,
      playerName,
      score: newValue,
    };
    const updatedGames = [...games, game];
    setGames(updatedGames);
    localStorage.setItem("games", JSON.stringify(updatedGames));
    setPartieNumero(partieNumero + 1); // Incrementer le numéro de partie
  };

  const passTurn = () => {
    const game = {
      sessionId,
      playerName,
      score: 0,
    };
    const updatedGames = [...games, game];
    setGames(updatedGames);
    localStorage.setItem("games", JSON.stringify(updatedGames));
    setPartieNumero(partieNumero + 1); // Incrementer le numéro de partie
  };

  const endSession = async () => {
    try {
      await axios.put(`http://localhost:3001/sessions/${sessionId}`);
      localStorage.removeItem("games"); // Supprimer les jeux du localStorage après la fin de la session
      setGames([]); // Réinitialiser les jeux locaux dans l'état
      setPartieNumero(0); // Réinitialiser le numéro de partie
    } catch (error) {
      console.error("Erreur lors de la fin de la session:", error);
    }
  };

  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem("games")) || [];
    setGames(storedGames);
    setPartieNumero(storedGames.length + 1); // Calculer le numéro de partie initial
  }, []);

  return (
    <div className="dice-game">
      <h2>Jeu de dés</h2>
      <p>Joueur: {playerDetails ? playerDetails.name : ""}</p>
      <p>
        Valeur du dé : {diceValue}
        <img src={dices[diceValue - 1]} alt={`Dice face ${diceValue}`} />
      </p>
      <p>Partie numéro : {partieNumero}</p>
      <button onClick={rollDice}>Lancer le Dé</button>
      <button onClick={passTurn}>Passer</button>
      <h3>Scores</h3>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            Partie {index + 1}: Score {game.score}
          </li>
        ))}
      </ul>
      <button onClick={endSession}>Terminer la Session</button>
    </div>
  );
}

export default DiceGame;
