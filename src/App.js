import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DiceGame from "./components/DiceGame";
import SessionForm from "./components/SessionForm";
import Login from "./components/Login";
import ScorePage from "./components/ScorePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/styles/App.css"; // Importer le fichier CSS

function App() {
  const [playerName, setPlayerName] = useState(null);
  const handleLogin = (name) => {
    setPlayerName(name);
  };
  return (
    <Router>
      <div className="App">
        <Header playerName={playerName} />
        <main>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/start-game"
              element={<DiceGame playerName={playerName} />}
            />
            <Route
              path="/with-config"
              element={<SessionForm playerName={playerName} />}
            />
            <Route path="/score" element={<ScorePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const Accueil = () => {
  return (
    <div className="welcome-container">
      <h2 className="welcome-title">Welcome to Dice Game</h2>
      <p className="welcome-text">
        We are excited to introduce you to our new dice game. Although there are
        many dice games available, we are working hard to make ours unique. We
        plan to incorporate AI to enhance gameplay, and we are also exploring
        the use of 3D rendering to bring a new level of immersion to the game.
        Stay tuned for updates and get ready for an exciting gaming experience!
      </p>
      <p className="welcome-text">Please login to play the game.</p>
    </div>
  );
};

export default App;
