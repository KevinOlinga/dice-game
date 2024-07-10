import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 GeekIt. Tous droits réservés.</p>
        <p>
          <a className="footer-link" href="https://geekit.com">
            geekit.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
