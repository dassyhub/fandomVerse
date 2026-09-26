import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiShield, FiChevronDown, FiSearch, FiBell, FiMoon, FiSun,
  FiUser, FiLogIn, FiUserPlus, FiBookmark, FiMenu, FiX,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

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
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-1 text-sm font-medium transition-colors ${
              isActive ? "text-white" : "text-[#a79bc0] hover:text-white"
            }`
          }
        >
          {label}
          <FiChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </NavLink>
      ) : (
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-medium text-[#a79bc0] transition-colors hover:text-white"
        >
          {label}
          <FiChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      )}

      <div
        className={`absolute left-0 top-full z-50 mt-2 w-48 origin-top rounded-xl border border-[#2c2038] bg-[#150f1d] p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] transition-all duration-200 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {items.map(([itemLabel, itemTo]) => (
          <NavLink
            key={itemTo}
            to={itemTo}
            className="block rounded-lg px-3 py-2 text-sm text-[#c9bfd9] transition hover:bg-[#1c1427] hover:text-white"
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
  const [open, setOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const q = e.currentTarget.q.value;
    setOpen(false);
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#241a30] bg-[#0c0811]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1536px] items-center gap-3 px-4 sm:px-6 lg:gap-6 lg:px-10">
        {/* Logo */}
        <NavLink to="/" className="flex shrink-0 items-center gap-2">
          <FiShield size={22} className="text-[#ff3e9e]" />
          <span className="text-lg font-black tracking-wide text-white sm:text-xl">
            FANDOM<span className="text-[#ff3e9e]">VERSE</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex">
          {MAIN_LINKS.map(([label, to, items]) =>
            items ? (
              <NavDropdown key={label} label={label} to={to} items={items} />
            ) : (
              <NavLink
                key={label}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-[#a79bc0] hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            )
          )}
        </nav>

        {/* Search */}
        <form
          onSubmit={submit}
          className="ml-auto hidden max-w-md flex-1 items-center gap-2 rounded-full border border-[#2c2038] bg-[#150f1d] px-3.5 py-2 text-sm text-[#a79bc0] transition focus-within:border-[#7447a1] md:flex"
        >
          <FiSearch size={14} />
          <input
            name="q"
            placeholder="Search anime, manga, movies, games..."
            className="w-full bg-transparent text-white placeholder:text-[#7a6f8c] focus:outline-none"
          />
        </form>

        {/* Right icons */}
        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <button
            type="button"
            aria-label="Notifications"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#2c2038] text-[#c9bfd9] transition hover:border-[#7447a1] hover:text-white sm:flex"
          >
            <FiBell size={15} />
          </button>

          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#2c2038] text-[#c9bfd9] transition hover:border-[#7447a1] hover:text-white sm:flex"
          >
            {theme === "dark" ? <FiMoon size={15} /> : <FiSun size={15} />}
          </button>

          {/* Avatar with Login/Sign up dropdown (dummy — SRS requires no real auth) */}
          <div
            className="relative hidden sm:block"
            onMouseEnter={() => setAvatarOpen(true)}
            onMouseLeave={() => setAvatarOpen(false)}
          >
            <button
              type="button"
              aria-label="Account"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] text-white"
            >
              <FiUser size={15} />
            </button>
            <div
              className={`absolute right-0 top-full z-50 mt-2 w-44 origin-top-right rounded-xl border border-[#2c2038] bg-[#150f1d] p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] transition-all duration-200 ${
                avatarOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              <NavLink to="/login" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#c9bfd9] transition hover:bg-[#1c1427] hover:text-white">
                <FiLogIn size={14} /> Login
              </NavLink>
              <NavLink to="/signup" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#c9bfd9] transition hover:bg-[#1c1427] hover:text-white">
                <FiUserPlus size={14} /> Sign Up
              </NavLink>
              <NavLink to="/bookmarks" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#c9bfd9] transition hover:bg-[#1c1427] hover:text-white">
                <FiBookmark size={14} /> Bookmarks
              </NavLink>
            </div>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2c2038] text-white lg:hidden"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[#241a30] bg-[#0c0811] transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          <form
            onSubmit={submit}
            className="mb-3 flex items-center gap-2 rounded-full border border-[#2c2038] bg-[#150f1d] px-3.5 py-2.5 text-sm text-[#a79bc0]"
          >
            <FiSearch size={14} />
            <input
              name="q"
              placeholder="Search FandomVerse..."
              className="w-full bg-transparent text-white placeholder:text-[#7a6f8c] focus:outline-none"
            />
          </form>

          {MAIN_LINKS.map(([label, to, items]) => (
            <div key={label}>
              <NavLink
                to={to || "#"}
                end={to === "/"}
                onClick={() => !items && setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? "bg-[#1c1427] text-white" : "text-[#c9bfd9] hover:bg-[#150f1d] hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
              {items && (
                <div className="ml-3 flex flex-col gap-0.5 border-l border-[#241a30] pl-3">
                  {items.map(([itemLabel, itemTo]) => (
                    <NavLink
                      key={itemTo}
                      to={itemTo}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2 text-xs font-medium text-[#a79bc0] hover:bg-[#150f1d] hover:text-white"
                    >
                      {itemLabel}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-full border border-[#2c2038] px-3 py-2 text-xs font-semibold text-white"
            >
              {theme === "dark" ? <FiMoon size={14} /> : <FiSun size={14} />}
              Theme
            </button>
            <div className="flex gap-2">
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#2c2038] px-4 py-2.5 text-center text-xs font-semibold text-white"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setOpen(false)}
                className="rounded-full bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] px-4 py-2.5 text-center text-xs font-bold text-white"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}