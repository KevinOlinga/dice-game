import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const generateRandomName = () => {
  const names = [
    "Player1",
    "Player2",
    "Guest123",
    "RandomPlayer",
    "Xedicus",
    "RisingSun",
    "DemonKing",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const playerName = name.trim() === "" ? generateRandomName() : name;

    try {
      const response = await axios.post("http://localhost:3001/players", {
        name: playerName,
      });
      onLogin(playerName);
      navigate("/start-game");
    } catch (error) {
      console.error("Erreur lors de la création du joueur :", error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Entrez votre nom
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Continuer</button>
      </form>
      <button onClick={handleSubmit}>Continuer en tant qu'invité</button>
    </div>
  );
}

export default Login;
