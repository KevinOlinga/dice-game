import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ playerName }) => {
  const viderLocalStorage = () => {
    localStorage.removeItem("games"); // Supprimer les jeux du localStorage après la fin de la session
    localStorage.removeItem("idSession"); // Supprimer les jeux du localStorage après la fin de la session
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" onClick={viderLocalStorage} to="/">
            Dice
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  end
                >
                  Accueil
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  end
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                {playerName ? (
                  <NavLink
                    to="/start-game"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Jouer
                  </NavLink>
                ) : (
                  <span className="nav-link disabled">Jouer</span>
                )}
              </li>
              <li className="nav-item">
                {playerName ? (
                  <NavLink
                    to="/score"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Score
                  </NavLink>
                ) : (
                  <span className="nav-link disabled">Score</span>
                )}
              </li>
              <li className="nav-item">
                {playerName ? (
                  <NavLink
                    to="/with-config"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Configurer
                  </NavLink>
                ) : (
                  <span className="nav-link disabled">Score</span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
