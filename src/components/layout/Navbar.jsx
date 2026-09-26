import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiBookmark, FiMenu, FiX, FiSearch, FiMessageCircle, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const links = [
  ["Home", "/"],
  ["Anime", "/category/anime"],
  ["Gaming", "/category/gaming"],
  ["Movies", "/category/movies"],
  ["Store", "/store"],
];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-white" : "text-[#a79bc0] hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#241a30] bg-[#0c0811]/90 backdrop-blur-md">
      <div className="mx-auto flex h-17 max-w-384 items-center gap-4 px-4 sm:px-6 lg:px-10">
        <NavLink
          to="/"
          className="shrink-0 text-lg font-black tracking-wide text-white sm:text-xl"
        >
          FANDOM<span className="text-[#ff3e9e]">VERSE</span>
        </NavLink>

        <nav className="ml-4 hidden items-center gap-6 lg:flex">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} end={to === "/"} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const q = e.currentTarget.q.value;
            navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
          }}
          className="ml-auto hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-[#2c2038] bg-[#150f1d] px-3.5 py-2 text-sm text-[#a79bc0] transition focus-within:border-[#7447a1] md:flex"
        >
          <FiSearch size={14} />
          <input
            name="q"
            placeholder="Search anime, characters, events..."
            className="w-full bg-transparent text-white placeholder:text-[#7a6f8c] focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <NavLink
            to="/bookmarks"
            aria-label="Bookmarks"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#2c2038] text-[#c9bfd9] transition hover:border-[#7447a1] hover:text-white sm:flex"
          >
            <FiBookmark size={15} />
          </NavLink>
          <NavLink
            to="/cart"
            aria-label={`Cart (${cartCount} items)`}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#2c2038] text-[#c9bfd9] transition hover:border-[#7447a1] hover:text-white sm:flex relative"
          >
            <FiShoppingBag size={15} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-h-[18px] min-w-[18px] px-1.5 items-center justify-center rounded-full bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] text-[10px] font-bold text-white border-2 border-[#0c0811]">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </NavLink>
          <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#2c2038] text-[#c9bfd9] sm:flex">
            <FiMessageCircle size={15} />
          </span>
          <NavLink
            to="/login"
            className="hidden rounded-full border border-[#2c2038] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1c1427] sm:inline-block"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="hidden rounded-full bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 sm:inline-block"
          >
            Sign Up
          </NavLink>

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

      <div
        className={`overflow-hidden border-t border-[#241a30] bg-[#0c0811] transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = e.currentTarget.q.value;
              setOpen(false);
              navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
            }}
            className="mb-3 flex items-center gap-2 rounded-full border border-[#2c2038] bg-[#150f1d] px-3.5 py-2.5 text-sm text-[#a79bc0]"
          >
            <FiSearch size={14} />
            <input
              name="q"
              placeholder="Search FandomVerse..."
              className="w-full bg-transparent text-white placeholder:text-[#7a6f8c] focus:outline-none"
            />
          </form>
          {links.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? "bg-[#1c1427] text-white" : "text-[#c9bfd9] hover:bg-[#150f1d] hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/bookmarks"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#c9bfd9] hover:bg-[#150f1d] hover:text-white"
          >
            Bookmarks
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#c9bfd9] hover:bg-[#150f1d] hover:text-white flex items-center gap-2"
          >
            <FiShoppingBag size={16} />
            Cart
            {cartCount > 0 && (
              <span className="ml-2 h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] text-[10px] font-bold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </NavLink>
          <div className="mt-2 flex gap-2">
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border border-[#2c2038] px-4 py-2.5 text-center text-xs font-semibold text-white"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] px-4 py-2.5 text-center text-xs font-bold text-white"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
