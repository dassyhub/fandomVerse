import { Link } from "react-router-dom";
import { FiBookmark } from "react-icons/fi";
import { useBookmarks } from "../../context/BookmarkContext";
import { imageForCategory } from "../../constants/categoryAssets";

export default function CharacterCard({ character = {} }) {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const id = character.id || "demo";
  const saved = bookmarks.some((b) => b.id === id);

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#2c2038] bg-[#130e1c] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#e64a9b] hover:shadow-[0_18px_40px_-15px_rgba(255,62,158,0.4)]">
      <Link to={`/characters/${id}`} className="flex min-w-0 flex-1 flex-col">
        <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-pink-700/70 via-fuchsia-800/60 to-indigo-900/70">
          <span className="absolute left-3 top-3 z-10 rounded-md bg-black/50 px-2 py-1 text-[9px] font-extrabold tracking-wider text-pink-300 backdrop-blur-sm">CHARACTER</span>
          <img src={character.image || imageForCategory(character.category)} alt={character.name || "Character"} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 p-4">
          <span className="truncate text-[10px] font-bold uppercase tracking-wider text-[#8b7ea3]">{character.series || "Series"}</span>
          <h3 className="break-words text-sm font-semibold text-white">{character.name || "Character Name"}</h3>
          {character.bio && <p className="line-clamp-2 text-xs text-[#a79bc0]">{character.bio}</p>}
        </div>
      </Link>
      <button type="button" aria-label={saved ? "Remove bookmark" : "Bookmark character"} onClick={() => toggleBookmark({ ...character, kind: "characters" })} className={`absolute right-3 top-3 z-10 rounded-full p-2 ${saved ? "bg-[#ff3e9e] text-white" : "bg-black/55 text-white"}`}><FiBookmark size={14} /></button>
    </article>
  );
}
