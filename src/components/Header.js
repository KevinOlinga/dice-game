import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ playerName }) => {
  return (
    <header>
      <h1>Mon Jeu de lancer de dés</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Login"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Login
            </NavLink>
          </li>
          <li>
            {playerName ? (
              <NavLink
                to="/start-game"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Jouer
              </NavLink>
            ) : (
              <span>Jouer</span>
            )}
          </li>
          <li>
            {playerName ? (
              <NavLink
                to="/score"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Score
              </NavLink>
            ) : (
              <span>Score</span>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
