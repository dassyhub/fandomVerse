import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBookmark,
  FiPlay,
  FiX,
  FiArrowRight,
  FiFilm,
  FiTv,
  FiMic,
  FiBookOpen,
} from "react-icons/fi";
import { TbMask, TbDeviceGamepad2, TbBubbleText } from "react-icons/tb";
import { useBookmarks } from "../context/BookmarkContext";

const heroSlides = [
  {
    id: "hero-a-battle-fought",
    image: "/images/A%20battle%20fought.jpg",
    imageAlt: "Battle scene from the supplied FandomVerse artwork",
    title: "A Battle Fought",
    category: "Art",
    description: "A battle scene from the local image collection; its original series title is not listed in the available content data.",
    trailerUrl: null,
  },
  {
    id: "hero-demon-slayer",
    image: "/images/Demon%20Slayer.jpg",
    imageAlt: "Demon Slayer artwork from the supplied hero image",
    title: "Demon Slayer",
    category: "Anime",
    description: "Tanjiro Kamado joins the Demon Slayer Corps and fights to protect others while searching for a way to restore his sister.",
    trailerUrl: null,
  },
  {
    id: "hero-featured-artwork",
    image: "/images/res.jpg",
    imageAlt: "Unidentified artwork from the FandomVerse image collection",
    title: "Featured Artwork",
    category: "Unverified",
    description: "This image is not linked to an identified title in the available FandomVerse content data.",
    trailerUrl: null,
  },
  {
    id: "hero-the-100",
    image: "/images/The%20100.jpg",
    imageAlt: "The 100 series artwork from the supplied hero image",
    title: "The 100",
    category: "TV Shows",
    description: "After a nuclear apocalypse, a group of young survivors returns to Earth to find out whether humanity can begin again.",
    trailerUrl: null,
  },
];

function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.hostname.includes("youtu.be")
      ? parsedUrl.pathname.slice(1)
      : parsedUrl.pathname.includes("/embed/")
        ? parsedUrl.pathname.split("/embed/")[1]
        : parsedUrl.searchParams.get("v");

    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

const categories = [
  {
    name: "Anime",
    icon: TbMask,
    color: "#ff3e9e",
    path: "/category/anime",
  },
  {
    name: "Gaming",
    icon: TbDeviceGamepad2,
    color: "#34e4ea",
    path: "/category/gaming",
  },
  {
    name: "Movies",
    icon: FiFilm,
    color: "#f97316",
    path: "/category/movies",
  },
  {
    name: "TV Shows",
    icon: FiTv,
    color: "#facc15",
    path: "/category/tvshows",
  },
  {
    name: "K-Pop",
    icon: FiMic,
    color: "#ec4899",
    path: "/category/kpop",
  },
  {
    name: "Comics",
    icon: TbBubbleText,
    color: "#22c55e",
    path: "/category/comics",
  },
  {
    name: "Manga",
    icon: FiBookOpen,
    color: "#9b5cff",
    path: "/category/manga",
  },
];
const trending = [
  {
    title: "Attack on Titan: A Final-Season Reading Guide",
    category: "Anime",
    image: "/images/anime/AOT.jpeg",
    alt: "Attack on Titan artwork",
    description: "A guide to the conflict and stakes of Attack on Titan's final story.",
    to: "/content/article/anime-content-1",
  },
  {
    title: "Grand Theft Auto VI Trailer 2",
    category: "Gaming",
    image: "/images/gaming/gtaa.jpeg",
    alt: "Grand Theft Auto VI artwork",
    description: "Rockstar Games' preview of Jason and Lucia's dangerous path through Leonida.",
    to: "/content/video/gaming-content-2",
  },
  {
    title: "Sinners: Official Trailer",
    category: "Movies",
    image: "/images/movies/sinners.jpeg",
    alt: "Sinners film artwork",
    description: "The official trailer for Ryan Coogler's dark homecoming horror story.",
    to: "/content/video/movies-content-2",
  },
  {
    title: "Black Clover: Official Main Trailer",
    category: "Anime",
    image: "/images/anime/Black-clover.jpeg",
    alt: "Black Clover artwork",
    description: "Asta's magic-filled pursuit of the Wizard King.",
    to: "/content/video/anime-content-2",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerClosing, setTrailerClosing] = useState(false);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const closeTimerRef = useRef(null);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const activeSlide = heroSlides[activeIndex];
  const trailerEmbedUrl = getYouTubeEmbedUrl(activeSlide.trailerUrl);
  const isBookmarked = bookmarks.some((item) => item.id === activeSlide.id);
  const closeTrailer = () => {
    window.clearTimeout(closeTimerRef.current);
    setTrailerClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setTrailerOpen(false);
      setTrailerClosing(false);
    }, 180);
  };

  const openTrailer = () => {
    window.clearTimeout(closeTimerRef.current);
    setTrailerClosing(false);
    setTrailerOpen(true);
  };

  useEffect(() => {
    if (trailerOpen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, trailerOpen]);

  useEffect(() => {
    if (!trailerOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeTrailer();
      } else if (event.key === "Tab") {
        const focusable = Array.from(
          document.querySelectorAll(".fv-trailer-dialog button, .fv-trailer-dialog iframe")
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [trailerOpen]);

  return (
    <div className="fv-home min-h-screen bg-[#090611] text-white">
      {/* ================= HERO ================= */}

      <section className="fv-home-hero relative min-h-100.75 overflow-hidden bg-linear-to-r from-[#29102e] via-[#1d112d] to-[#111d35]">
        <div className="fv-hero-slides absolute inset-0" aria-label="Featured FandomVerse images">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.imageAlt}
              aria-hidden={index !== activeIndex}
              className={`fv-hero-image absolute inset-0 h-full w-full object-cover ${index === activeIndex ? "is-active" : ""}`}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          ))}
        </div>
        <div className="fv-hero-overlay absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(164,48,173,0.18),transparent_60%)]" />

        <div className="relative z-10 mx-auto flex min-h-100.75 max-w-384 items-center px-6 py-9 sm:px-10 lg:px-16">
          <div key={activeSlide.id} className="fv-hero-copy max-w-170">
            {/* Featured label */}
            <span className="fv-hero-category mb-5 inline-flex rounded-full bg-linear-to-r from-[#ff3c91] to-[#ff347e] px-4 py-1 text-[11px] font-bold tracking-wider">
              FEATURED • {activeSlide.category.toUpperCase()}
            </span>

            {/* Title */}
            <h1 className="fv-hero-title text-4xl font-extrabold leading-[1.08] tracking-[-1px] sm:text-5xl lg:text-[48px]">
              {activeSlide.title}
            </h1>

            {/* Description */}
            <p className="fv-hero-description mt-5 max-w-137.5 text-[15px] leading-5 text-[#aaa0bd]">
              {activeSlide.description}
            </p>

            {/* Actions */}
            <div className="hero-actions mt-4 flex items-center gap-4">
              <button
                type="button"
                aria-label={`Watch trailer for ${activeSlide.title}`}
                onClick={openTrailer}
                className="flex items-center gap-2 rounded-full bg-linear-to-r from-[#ff3d91] to-[#8d4fff] px-5 py-2.5 text-xs font-bold transition hover:opacity-90"
              >
                <FiPlay size={14} />
                Watch Trailer
              </button>

              <button
                type="button"
                aria-pressed={isBookmarked}
                onClick={() => toggleBookmark({ ...activeSlide, kind: "content" })}
                className="flex items-center gap-2 rounded-full border border-[#39294d] px-5 py-2.5 text-xs font-semibold transition hover:bg-[#21172d]"
              >
                <FiBookmark size={14} />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>
            </div>

            <div className="fv-hero-pagination mt-5 flex items-center gap-2" aria-label="Choose featured image">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show ${slide.title}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={`fv-hero-dot ${index === activeIndex ? "is-active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {trailerOpen && (
        <div
          className={`fv-trailer-backdrop ${trailerClosing ? "is-closing" : ""}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeTrailer();
          }}
        >
          <section
            className={`fv-trailer-dialog ${trailerClosing ? "is-closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fv-trailer-title"
            aria-describedby="fv-trailer-description"
          >
            <div className="fv-trailer-heading">
              <h2 id="fv-trailer-title">{activeSlide.title} trailer</h2>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close trailer dialog"
                onClick={closeTrailer}
                className="fv-trailer-close"
              >
                <FiX size={20} />
              </button>
            </div>
            <p id="fv-trailer-description" className="sr-only">
              {trailerEmbedUrl
                ? `YouTube trailer for ${activeSlide.title}.`
                : `No verified YouTube trailer is available for ${activeSlide.title}.`}
            </p>
            {trailerEmbedUrl ? (
              <div className="fv-trailer-frame">
                <iframe
                  src={trailerEmbedUrl}
                  title={`YouTube trailer for ${activeSlide.title}`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="fv-trailer-unavailable">
                No trailer is shown because the available project data does not verify a YouTube video for this image.
              </p>
            )}
          </section>
        </div>
      )}

      
      <main className="mx-auto max-w-384 px-6 py-10 sm:px-8 lg:px-10">

        {/* Categories */}
        <section>
          <h2 className="mb-6 text-xs font-bold tracking-[2px] text-[#aaa0bd]">
            EXPLORE CATEGORIES
          </h2>

          <div className="fv-category-grid grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="
                  group
                  flex
                  h-26.25
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
                <div
                  className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                  style={{
                    backgroundColor: `${category.color}22`,
                    color: category.color,
                  }}
                >
                  <category.icon size={20} />
                </div>

                <span className="text-xs font-medium text-white">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Trending Now</h2>

            <Link
              to="/explore"
              className="flex items-center gap-1 text-xs font-semibold text-[#25dce7] transition hover:text-white"
            >
              View All
              <FiArrowRight size={13} />
            </Link>
          </div>

          {/* Trending cards */}

          <div className="fv-trending-grid grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {trending.map((item) => (
              <Link
                key={item.title}
                to={item.to}
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
                <div className="relative aspect-[1.65/1] overflow-hidden bg-[#1b1424]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_55%)]" />
                </div>

                {/* Card information */}
                <div className="p-4">
                  <p className="mb-1 text-[10px] uppercase tracking-wider text-[#9b8cab]">
                    {item.category}
                  </p>

                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#9b8cab]">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
