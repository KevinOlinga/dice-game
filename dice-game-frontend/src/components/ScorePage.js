import React, { useEffect, useState } from "react";

const ScorePage = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem("games")) || [];
    const sessionMap = new Map();

    storedGames.forEach((game) => {
      if (!sessionMap.has(game.sessionId)) {
        sessionMap.set(game.sessionId, {
          sessionId: game.sessionId,
          playerName: game.playerName,
          startDate: new Date(),
          endDate: null,
          totalScore: 0,
        });
      }
      const session = sessionMap.get(game.sessionId);
      session.totalScore += game.score;
      session.endDate = new Date(); // Simulating the end date
      sessionMap.set(game.sessionId, session);
    });

    setSessions(Array.from(sessionMap.values()));
  }, []);

  return (
    <div>
      <h2>Sessions et Scores des joueurs</h2>
      <ul>
        {sessions.map((session, index) => (
          <li key={index}>
            Session ID: {session.sessionId}, Joueur: {session.playerName},
            Début: {session.startDate.toLocaleString()}, Fin:{" "}
            {session.endDate ? session.endDate.toLocaleString() : "En cours"},
            Score Total: {session.totalScore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScorePage;
