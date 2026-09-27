import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiShield,
  FiChevronDown,
  FiSearch,
  FiMoon,
  FiSun,
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiBookmark,
  FiMenu,
  FiX,
  FiShoppingBag,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";

const EXPLORE_ITEMS = [
  ["Anime", "/category/anime"],
  ["Gaming", "/category/gaming"],
  ["Movies", "/category/movies"],
  ["TV Shows", "/category/tvshows"],
  ["K-Pop", "/category/kpop"],
  ["Comics", "/category/comics"],
  ["Manga", "/category/manga"],
];

const MORE_ITEMS = [
  ["Bookmarks", "/bookmarks"],
  ["Release Radar", "/releases"],
  ["Trailers", "/trailers"],
  ["About Us", "/about"],
  ["Contact Us", "/contact"],
];

const MAIN_LINKS = [
  ["Home", "/", null],
  ["Explore", "/explore", EXPLORE_ITEMS],
  ["Articles", "/explore", null],
  ["Community", "/events", null],
  ["Events", "/events", null],
  ["Store", "/store", null],
  ["More", null, MORE_ITEMS],
];

function NavDropdown({ label, to, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div
      ref={ref}
      className="fv-nav-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="fv-nav-dropdown-trigger">
        {to ? (
          <NavLink
            to={to}
            className={({ isActive }) => `fv-nav-link ${isActive ? "is-active" : ""}`}
          >
            {label}
          </NavLink>
        ) : (
          <span className="fv-nav-link">{label}</span>
        )}
        <button
          type="button"
          className="fv-nav-chevron"
          aria-label={`${open ? "Close" : "Open"} ${label} menu`}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <FiChevronDown size={14} className={open ? "is-open" : ""} />
        </button>
      </div>

      <div className={`fv-nav-dropdown-menu ${open ? "is-open" : ""}`}>
        {items.map(([itemLabel, itemTo]) => (
          <NavLink
            key={itemTo}
            to={itemTo}
            onClick={() => setOpen(false)}
            className="fv-nav-dropdown-link"
          >
            {itemLabel}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { cart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!accountRef.current?.contains(event.target)) setAccountOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setAccountOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const q = event.currentTarget.elements.q?.value.trim() || "";
    setMobileOpen(false);
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fv-navbar">
      <div className="fv-navbar-inner">
        <NavLink to="/" className="fv-brand" onClick={closeMobile} aria-label="FandomVerse home">
          <span className="fv-brand-mark" aria-hidden="true"><FiShield size={20} /></span>
          <span className="fv-brand-word">FANDOM<span>VERSE</span></span>
        </NavLink>

        <nav className="fv-desktop-nav" aria-label="Primary navigation">
          {MAIN_LINKS.map(([label, to, items]) =>
            items ? (
              <NavDropdown key={label} label={label} to={to} items={items} />
            ) : (
              <NavLink
                key={label}
                to={to}
                end={to === "/"}
                className={({ isActive }) => `fv-nav-link ${isActive ? "is-active" : ""}`}
              >
                {label}
              </NavLink>
            ),
          )}
        </nav>

        <form className="fv-header-search" onSubmit={submit} role="search">
          <FiSearch size={15} aria-hidden="true" />
          <input
            name="q"
            type="search"
            autoComplete="off"
            placeholder="Search anime, manga, movies, games..."
            aria-label="Search FandomVerse"
          />
        </form>

        <div className="fv-nav-actions">
          <button
            type="button"
            className="fv-action-button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <FiMoon size={16} /> : <FiSun size={16} />}
          </button>

          <NavLink to="/bookmarks" className="fv-action-button" aria-label="Bookmarks">
            <FiBookmark size={16} />
          </NavLink>

          <NavLink to="/cart" className="fv-action-button fv-cart-action" aria-label={`Cart, ${cartCount} items`}>
            <FiShoppingBag size={16} />
            {cartCount > 0 && <span className="fv-cart-badge">{cartCount > 9 ? "9+" : cartCount}</span>}
          </NavLink>

          <div className="fv-account" ref={accountRef}>
            <button
              type="button"
              className="fv-account-button"
              aria-label="Account menu"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((value) => !value)}
            >
              <FiUser size={16} />
            </button>
            <div className={`fv-account-menu ${accountOpen ? "is-open" : ""}`}>
              <NavLink to="/login" onClick={() => setAccountOpen(false)}><FiLogIn size={14} /> Login</NavLink>
              <NavLink to="/signup" onClick={() => setAccountOpen(false)}><FiUserPlus size={14} /> Sign Up</NavLink>
              <NavLink to="/bookmarks" onClick={() => setAccountOpen(false)}><FiBookmark size={14} /> Bookmarks</NavLink>
            </div>
          </div>

          <button
            type="button"
            className="fv-menu-button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="fandomverse-mobile-menu"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <FiX size={19} /> : <FiMenu size={19} />}
          </button>
        </div>
      </div>

      <div id="fandomverse-mobile-menu" className={`fv-mobile-menu ${mobileOpen ? "is-open" : ""}`}>
        <div className="fv-mobile-menu-inner">
          <form className="fv-mobile-search" onSubmit={submit} role="search">
            <FiSearch size={15} aria-hidden="true" />
            <input name="q" type="search" autoComplete="off" placeholder="Search FandomVerse..." aria-label="Search FandomVerse" />
          </form>

          <nav className="fv-mobile-links" aria-label="Mobile navigation">
            {MAIN_LINKS.map(([label, to, items]) => (
              <div className="fv-mobile-group" key={label}>
                {to ? (
                  <NavLink to={to} end={to === "/"} onClick={closeMobile}>{label}</NavLink>
                ) : (
                  <span>{label}</span>
                )}
                {items && (
                  <div className="fv-mobile-sublinks">
                    {items.map(([itemLabel, itemTo]) => (
                      <NavLink key={itemTo} to={itemTo} onClick={closeMobile}>{itemLabel}</NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="fv-mobile-footer-actions">
            <button type="button" className="fv-mobile-theme" onClick={toggleTheme}>
              {theme === "dark" ? <FiMoon size={15} /> : <FiSun size={15} />}
              {theme === "dark" ? "Dark mode" : "Light mode"}
            </button>
            <NavLink to="/login" onClick={closeMobile}>Login</NavLink>
            <NavLink to="/signup" className="fv-mobile-signup" onClick={closeMobile}>Sign Up</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
