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
  const [diceValue, setDiceValue] = useState(1); // Etat pour stocker la valeur du dé
  const [playerDetails, setPlayerDetails] = useState(null); // Etat pour stocker les détails du joueur

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

    if (playerName) {
      fetchPlayerDetails();
    }
  }, [playerName]);

  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 6) + 1; // Génère un nombre aléatoire entre 1 et 6
    setDiceValue(newValue);
  };
  return (
    <div className="dice-game">
      <h2>Jeu de dés</h2>
      <p>Joueur: {playerDetails ? playerDetails.name : ""}</p>
      <p>
        Valeur du dé : {diceValue}
        <img src={dices[diceValue - 1]} alt={`Dice face ${diceValue}`} />
      </p>
      <button onClick={rollDice}>Lancer le Dé</button>
    </div>
  );
}

export default DiceGame;
