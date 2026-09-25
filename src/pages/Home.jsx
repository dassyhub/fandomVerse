import { Link } from "react-router-dom";
import {
  FiBookmark,
  FiPlay,
  FiArrowRight,
} from "react-icons/fi";

const categories = [
  {
    name: "Anime",
    icon: "🎭",
    path: "/category/anime",
  },
  {
    name: "Gaming",
    icon: "🎮",
    path: "/category/gaming",
  },
  {
    name: "Movies",
    icon: "🎬",
    path: "/category/movies",
  },
  {
    name: "TV Shows",
    icon: "📺",
    path: "/category/tvshows",
  },
  {
    name: "K-Pop",
    icon: "🎤",
    path: "/category/kpop",
  },
  {
    name: "Comics",
    icon: "💥",
    path: "/category/comics",
  },
  {
    name: "Manga",
    icon: "📖",
    path: "/category/manga",
  },
];

const trending = [
  {
    title: "Nightfall Reapers: New Arc",
    category: "Anime",
    gradient: "from-fuchsia-600/70 to-indigo-800/70",
  },
  {
    title: "Starforge Online: Season 2",
    category: "Gaming",
    gradient: "from-sky-600/70 to-indigo-900/70",
  },
  {
    title: "The Last Horizon",
    category: "Movies",
    gradient: "from-amber-600/70 to-fuchsia-800/70",
  },
  {
    title: "Static City",
    category: "TV Shows",
    gradient: "from-teal-600/70 to-indigo-800/70",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090611] text-white">

      {/* ================= HERO ================= */}

      <section className="relative min-h-[403px] overflow-hidden bg-gradient-to-r from-[#29102e] via-[#1d112d] to-[#111d35]">

        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(164,48,173,0.18),transparent_60%)]" />

        <div className="relative mx-auto flex min-h-[403px] max-w-[1536px] items-center px-10 lg:px-16">

          <div className="max-w-[680px]">

            {/* Featured label */}
            <span className="mb-5 inline-flex rounded-full bg-gradient-to-r from-[#ff3c91] to-[#ff347e] px-4 py-1 text-[11px] font-bold tracking-wider">
              FEATURED • ANIME
            </span>

            {/* Title */}
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-[-1px] sm:text-5xl lg:text-[48px]">
              Nightfall Reapers:
              <br />
              The Ember Arc
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[550px] text-[15px] leading-5 text-[#aaa0bd]">
              Kaida and the last Reapers face their greatest threat yet in the
              fight to reclaim the Ember Throne.
            </p>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-4">

              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff3d91] to-[#8d4fff] px-5 py-2.5 text-xs font-bold transition hover:opacity-90"
              >
                <FiPlay size={14} />
                Watch Trailer
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-[#39294d] px-5 py-2.5 text-xs font-semibold transition hover:bg-[#21172d]"
              >
                <FiBookmark size={14} />
                Bookmark
              </button>

            </div>
          </div>
        </div>
      </section>


      {/* ================= MAIN CONTENT ================= */}

      <main className="mx-auto max-w-[1536px] px-6 py-10 sm:px-8 lg:px-10">

        {/* ================= CATEGORIES ================= */}

        <section>

          <h2 className="mb-6 text-xs font-bold tracking-[2px] text-[#aaa0bd]">
            EXPLORE CATEGORIES
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">

            {categories.map((category) => (

              <Link
                key={category.name}
                to={category.path}
                className="
                  group
                  flex
                  h-[105px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[14px]
                  border
                  border-[#322442]
                  bg-[#15101d]
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-[#7447a1]
                  hover:bg-[#1c1427]
                "
              >

                <span className="mb-3 text-xl transition-transform duration-200 group-hover:scale-110">
                  {category.icon}
                </span>

                <span className="text-xs font-medium text-white">
                  {category.name}
                </span>

              </Link>

            ))}

          </div>

        </section>


        {/* ================= TRENDING ================= */}

        <section className="mt-7">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-lg font-bold">
              Trending Now
            </h2>

            <Link
              to="/explore"
              className="flex items-center gap-1 text-xs font-semibold text-[#25dce7] transition hover:text-white"
            >
              View All
              <FiArrowRight size={13} />
            </Link>

          </div>


          {/* Trending cards */}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {trending.map((item) => (

              <article
                key={item.title}
                className="
                  group
                  overflow-hidden
                  rounded-[14px]
                  border
                  border-[#312242]
                  bg-[#15101d]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#7144a0]
                "
              >

                {/* Image */}

                <div className={`relative aspect-[1.65/1] overflow-hidden bg-gradient-to-br ${item.gradient}`}>

                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-110 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_60%)]" />

                  {/* Image overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                </div>


                {/* Card information */}

                <div className="p-4">

                  <p className="mb-1 text-[10px] uppercase tracking-wider text-[#9b8cab]">
                    {item.category}
                  </p>

                  <h3 className="text-sm font-bold text-white">
                    {item.title}
                  </h3>

                </div>

              </article>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}