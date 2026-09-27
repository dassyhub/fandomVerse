import { Link } from "react-router-dom";
import { FiFilm, FiTv, FiMic, FiBookOpen } from "react-icons/fi";
import { TbMask, TbDeviceGamepad2, TbBubbleText } from "react-icons/tb";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

const CATEGORIES = [
  { slug: "anime", label: "Anime", icon: TbMask, color: "#ff3e9e" },
  { slug: "gaming", label: "Gaming", icon: TbDeviceGamepad2, color: "#34e4ea" },
  { slug: "movies", label: "Movies", icon: FiFilm, color: "#f97316" },
  { slug: "tvshows", label: "TV Shows", icon: FiTv, color: "#facc15" },
  { slug: "kpop", label: "K-Pop", icon: FiMic, color: "#ec4899" },
  { slug: "comics", label: "Comics", icon: TbBubbleText, color: "#22c55e" },
  { slug: "manga", label: "Manga", icon: FiBookOpen, color: "#9b5cff" },
];

export default function Explore() {
  return (
    <div className="mx-auto max-w-[1536px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <Breadcrumbs items={[{ label: "Explore" }]} />
      <h1 className="text-3xl font-black text-white sm:text-4xl">Explore FandomVerse</h1>
      <p className="mt-2 max-w-xl text-sm text-[#a79bc0]">
        Jump into any fandom category to browse articles, media, characters, events, and merch.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to={`/category/${c.slug}`}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-[#2c2038] bg-[#150f1d] px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7447a1] hover:shadow-[0_18px_40px_-15px_rgba(155,92,255,0.4)]"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${c.color}22`, color: c.color }}
            >
              <c.icon size={26} />
            </div>
            <span className="text-sm font-semibold text-white">{c.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}