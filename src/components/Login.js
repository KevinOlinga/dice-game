import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Login.css";

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

      if (response.data.existing) {
        alert(
          `Bienvenue ${playerName}, inscrit depuis le ${new Date(
            response.data.registrationDate
          ).toLocaleDateString()}`
        );
      } else {
        alert(
          `Bienvenue nouveau joueur, vous êtes le joueur numéro ${response.data.playerCount}`
        );
      }

      onLogin(playerName);
      navigate("/start-game");
    } catch (error) {
      console.error("Erreur lors de la création du joueur :", error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Nom d'utilisateur
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />
        </label>
        <button type="submit" className="login-button">
          Continuer
        </button>
      </form>
      <button onClick={handleSubmit} className="login-button">
        Continuer en tant qu'invité
      </button>
    </div>
  );
}

export default Login;
