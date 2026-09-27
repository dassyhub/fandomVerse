import { Link } from "react-router-dom";
import { FiBookmark } from "react-icons/fi";
import { useBookmarks } from "../../context/BookmarkContext";

const typeGradients = {
  ARTICLE: "from-fuchsia-600/70 to-indigo-700/70",
  VIDEO: "from-sky-600/70 to-indigo-800/70",
  TRAILER: "from-amber-600/70 to-fuchsia-800/70",
  GALLERY: "from-purple-600/70 to-violet-900/70",
  AUDIO: "from-teal-600/70 to-indigo-800/70",
};

export default function ContentCard({ item = {} }) {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const type = item.type || "ARTICLE";
  const id = item.id || "demo";
  const routeType = type === "TRAILER" ? "video" : type.toLowerCase();
  const saved = bookmarks.some((b) => b.id === id);

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#2c2038] bg-[#130e1c] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#7447a1] hover:shadow-[0_18px_40px_-15px_rgba(155,92,255,0.45)]">
      <Link to={`/content/${routeType}/${id}`} className="flex min-w-0 flex-1 flex-col">
        <div className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${typeGradients[type] || typeGradients.ARTICLE}`}>
          {item.thumbnail ? (
            <img src={item.thumbnail} alt={item.title || "Content thumbnail"} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
          )}
          <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-1 text-[9px] font-extrabold tracking-wider text-cyan-300 backdrop-blur-sm">{type}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4">
          <h3 className="line-clamp-2 break-words text-sm font-semibold text-white">{item.title || "Fandom Content"}</h3>
          {item.description && <p className="line-clamp-3 break-words text-xs text-[#a79bc0]">{item.description}</p>}
          <span className="mt-auto pt-1 text-[11px] font-medium text-[#8b7ea3]">{item.meta || "View details"}</span>
        </div>
      </Link>
      <button type="button" aria-label={saved ? "Remove bookmark" : "Bookmark content"} onClick={() => toggleBookmark({ ...item, kind: type === "ARTICLE" ? "articles" : "media" })} className={`absolute right-3 top-3 z-10 rounded-full p-2 backdrop-blur ${saved ? "bg-[#ff3e9e] text-white" : "bg-black/55 text-white"}`}>
        <FiBookmark size={14} />
      </button>
    </article>
  );
}
