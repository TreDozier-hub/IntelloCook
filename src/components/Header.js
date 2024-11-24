import React, { useState } from "react";
import Logo from "../assets/logo_site.png";
import "../components/styleHeader.css";

// import "../scriptMenu.js";


const Header = () => {

  // Fonction pour basculer le menu mobile (trouver sur internet)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">

      <div className="logo">
        <img src={Logo} alt="IntelliCook Logo" />
      </div>

      <nav className="nav-menu">
        <a href="#" className="active">Accueil</a>
        <a href="/pages/tendance.js">Tendance</a>
        <a href="#">Favoris</a>
        <a href="#">LePlus</a>
      </nav>

      <div className="search-bar">
        <input type="text" placeholder="Rechercher..." />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><g fill="currentColor">
          <path fillRule="evenodd" d="M5.5 9.5a5.5 5.5 0 0 0 8.22 4.782q.09.15.22.279l3 3a1.5 1.5 0 0 0 2.12-2.122l-3-3a1.5 1.5 0 0 0-.278-.22A5.5 5.5 0 1 0 5.5 9.5" clipRule="evenodd" opacity={0.2}></path>
          <path fillRule="evenodd" d="M4.828 4.828A5 5 0 1 0 11.9 11.9a5 5 0 0 0-7.07-7.07m6.364 6.364a4 4 0 1 1-5.656-5.657a4 4 0 0 1 5.656 5.657" clipRule="evenodd"></path>
          <path d="M11.192 12.627a1 1 0 0 1 1.415-1.414l2.828 2.829a1 1 0 1 1-1.414 1.414z"></path></g></svg>
        </button>
      </div>

      {/* Bouton burger */}
      <button className="burger-menu" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menu mobile */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "show" : ""}`}>
        <a href="#" className="active">Accueil</a>
        <a href="#">Tendance</a>
        <a href="#">Favoris</a>
        <a href="#">LePlus</a>
        
      </div>
    </header>
  );
};

export default Header;