import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const handleSubmit = (event) => {
    event.preventDefault();
    const playerName = name.trim() === "" ? generateRandomName() : name;
    onLogin(playerName);
    navigate("/start-game");
  };
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Continue</button>
      </form>
      <button onClick={handleSubmit}>Continue as Guest</button>
    </div>
  );
}
export default Login;
