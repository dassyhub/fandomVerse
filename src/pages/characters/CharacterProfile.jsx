import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowRight, FiBookmark } from "react-icons/fi";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useBookmarks } from "../../context/BookmarkContext";
import { imageForCategory } from "../../constants/categoryAssets";

const CATEGORY_LABEL = {
  anime: "Anime", gaming: "Gaming", movies: "Movies", tvshows: "TV Shows",
  kpop: "K-Pop", comics: "Comics", manga: "Manga",
};

export default function CharacterProfile() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const { bookmarks = [], toggleBookmark } = useBookmarks() || {};

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/data/characters.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((all) => {
        if (cancelled) return;
        setCharacter((all || []).find((c) => c.id === id) || null);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return <div className="mx-auto max-w-[1536px] px-4 py-16 text-center text-[#8b7ea3] sm:px-6 lg:px-10">Loading character…</div>;
  }

  if (!character) {
    return (
      <div className="mx-auto max-w-[1536px] px-4 py-16 text-center sm:px-6 lg:px-10">
        <p className="text-[#8b7ea3]">Character not found.</p>
        <Link to="/" className="mt-3 inline-block text-sm font-semibold text-[#34e4ea]">← Back to Home</Link>
      </div>
    );
  }

  const isBookmarked = bookmarks.some((b) => b.id === character.id);
  const categoryLabel = CATEGORY_LABEL[character.category] || character.category;

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <Breadcrumbs
        items={[
          { label: categoryLabel, to: `/category/${character.category}` },
          { label: character.name },
        ]}
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] shrink-0 overflow-hidden rounded-3xl bg-gradient-to-br from-pink-700/70 via-fuchsia-800/60 to-indigo-900/70 lg:mx-0 lg:w-[360px] lg:max-w-none">
          <img src={character.image || imageForCategory(character.category)} alt={character.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.16),transparent_55%)]" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-[#2c2038] bg-[#150f1d] px-3 py-1 text-xs font-semibold text-white">
              {character.series}
            </span>
            <span className="rounded-full border border-[#2c2038] bg-[#150f1d] px-3 py-1 text-xs font-semibold text-white">
              {categoryLabel}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl lg:text-[40px]">
            {character.name}
          </h1>

          <p className="mt-5 text-xs font-extrabold uppercase tracking-widest text-[#a79bc0]">
            Biography
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#c9bfd9]">
            {character.bio}
          </p>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-widest text-[#a79bc0]">
            Traits
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(character.traits || []).map((t) => (
              <span key={t} className="rounded-full border border-[#2c2038] bg-[#150f1d] px-3 py-1 text-xs font-semibold text-white">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toggleBookmark && toggleBookmark(character)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition active:scale-95 ${
                isBookmarked
                  ? "bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] text-white"
                  : "bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] text-white hover:opacity-90"
              }`}
            >
              <FiBookmark size={14} />
              {isBookmarked ? "Bookmarked" : "Bookmark Character"}
            </button>
            <Link
              to={`/category/${character.category}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#2c2038] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1c1427]"
            >
              View Series
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
