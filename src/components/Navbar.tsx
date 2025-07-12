import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" onClick={closeMenu}>
            SKPSolution
          </Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/speedtest" onClick={closeMenu}>
              Speed Test
            </Link>
          </li>
          <li>
            <Link to="/fmRadio" onClick={closeMenu}>
              FM Radio
            </Link>
          </li>
          <li>
            <Link to="/ytf-download" onClick={closeMenu}>
              YT Downloader
            </Link>
          </li>
          <li>
            <Link to="/js-paly-ground" onClick={closeMenu}>
              JS Playground
            </Link>
          </li>
          <li>
            <Link to="/color-picker" onClick={closeMenu}>
              Color Picker
            </Link>
          </li>
          <li>
            <Link to="/transform-playground" onClick={closeMenu}>
              Transform Playground
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={closeMenu}>
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
