import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 48px;
    background: #f7f0ea;
    border-bottom: 1px solid #ede3da;
    position: sticky;
    top: 0;
    z-index: 200;
  }

  .navbar-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .navbar-logo-icon {
    width: 42px;
    height: 42px;
  }

  .navbar-logo-text h2 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: #3a2118;
    margin: 0;
    line-height: 1.1;
  }

  .navbar-logo-text p {
    font-family: 'Poppins', sans-serif;
    font-size: 9px;
    color: #a07060;
    letter-spacing: 2px;
    margin: 0;
  }

  .navbar-menu {
    display: flex;
    gap: 32px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .navbar-menu li {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    color: #5a3e36;
    cursor: pointer;
    position: relative;
    padding-bottom: 4px;
    transition: color 0.2s;
  }

  .navbar-menu li:hover { color: #e38b94; }

  .hamburger {
    display: none;
    font-size: 24px;
    color: #5a3e36;
    cursor: pointer;
    background: none;
    border: none;
    z-index: 210;
  }

  /* ── Backdrop ── */
  .mobile-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 190;
  }

  .mobile-backdrop.open {
    display: block;
  }

  /* ── Mobile drawer ── */
  .mobile-menu {
    display: none;
    flex-direction: column;
    position: fixed;
    top: 73px;
    left: 0;
    right: 0;
    background: #f7f0ea;
    padding: 0 24px 16px;
    border-bottom: 1px solid #ede3da;
    z-index: 200;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }

  .mobile-menu.open {
    display: flex;
  }

  .mobile-menu li {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    color: #5a3e36;
    list-style: none;
    padding: 14px 0;
    border-bottom: 1px solid #ede3da;
    cursor: pointer;
    transition: color 0.2s;
  }

  .mobile-menu li:hover { color: #e38b94; }

  .mobile-menu li.active { color: #e38b94; }

  .mobile-menu li:last-child { border-bottom: none; }

  @media (max-width: 768px) {
    .navbar { padding: 14px 20px; }
    .navbar-menu { display: none; }
    .hamburger { display: block; }
  }

  @media (min-width: 769px) {
    .mobile-menu { display: none !important; }
    .mobile-backdrop { display: none !important; }
  }
`;

const navItems = ["Home", "Best Sellers", "Shop", "Instagram"];

const Navbar = ({ onNav }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClick = (item) => {
    setActive(item);
    setMobileOpen(false);
    onNav?.(item);
  };

  return (
    <>
      <style>{styles}</style>

      {/* Backdrop */}
      <div
        className={`mobile-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <nav className="navbar">
        <div className="navbar-logo">
          <img
    src="/37941-modified.png"
    alt="Crochet Loopsss Logo"
    className="navbar-logo-icon"
  />
          <div className="navbar-logo-text">
            <h2>crochet loopsss</h2>
            <p>HANDMADE WITH LOVE ♥</p>
          </div>
        </div>

        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => handleClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile dropdown — fixed, stays on screen while scrolling */}
      <ul className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li
            key={item}
            className={active === item ? "active" : ""}
            onClick={() => handleClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;