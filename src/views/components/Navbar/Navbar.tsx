import { Link } from 'react-router-dom';
import './Navbar.css'; // Si tu as créé un fichier CSS dédié


export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
          <img src="src/assets/images/logo.png" style={{ width: "80px", height: "auto" }} alt="Logo Kemistry" />
          <Link to="/">Kemistry</Link>
        </div>
      </div>
      {/* <div className="">
        <input type="text"  placeholder="Rechercher..." className="navbar-search" />
      </div> */}
      <ul className="navbar-links">
        {/* <li>
          <Link to="/boutique">La boutique</Link>
        </li>
        <li>
          <Link to="/historique">Notre histoire</Link>
        </li>
        <li>
          <Link to="/panier">Mon panier</Link>
        </li> */}
        <li>
          <Link to="/maison" style={{ color: "#B08A52" }}>LA MAISON</Link>
        </li>
        <li>
          <Link to="/codex" style={{ color: "#B08A52" }}>LE CODEX</Link>
        </li>
        <li>
          <Link to="/elixir" style={{ color: "#B08A52" }}>LES ELIXIRS</Link>
        </li>
        <li>
          <Link to="/rituel" style={{ color: "#B08A52" }}>LES RITUELS</Link>
        </li>
        <li>
          <Link to="/fondatrice" style={{ color: "#B08A52" }}>LA FONDATRICE</Link>
        </li>
        <li>
          <Link to="/experience" style={{ color: "#B08A52" }}>L'EXPÉRIENCE</Link>
        </li>
      </ul>
    </nav>
  );
};