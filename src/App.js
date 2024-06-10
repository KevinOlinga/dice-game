import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DiceGame from "./components/DiceGame";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <DiceGame />
      </main>
      <Footer />
    </div>
  );
}

export default App;
