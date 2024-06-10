import React, { useState } from "react";

function DiceGame() {
  const [diceValue, setDiceValue] = useState(1); // Etat pour stocker la valeur du dé
  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 6) + 1; // Génère un nombre aléatoire entre 1 et 6
    setDiceValue(newValue);
  };
  return (
    <div className="dice-game">
      <h2>Jeu de dés</h2>
      <p>Valeur du dé : {diceValue}</p>
      <button onClick={rollDice}>Lancer le Dé</button>
    </div>
  );
}
export default DiceGame;
