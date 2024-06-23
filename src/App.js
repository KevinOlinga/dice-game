import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DiceGame from "./components/DiceGame";
import Login from "./components/Login";
import ScorePage from "./components/ScorePage"; // Importez le composant ScorePage

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
            <Route path="/" element={<Accueil />}></Route>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/start-game"
              element={<DiceGame playerName={playerName} />}
            />
            <Route path="/score" element={<ScorePage />} />{" "}
            {/* Ajoutez la route pour ScorePage */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const Accueil = () => {
  return (
    <div>
      <h2>Welcome to Dice Game</h2>
      <p>Please login to play the game</p>
    </div>
  );
};

export default App;
