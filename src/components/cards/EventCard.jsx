import { Link } from "react-router-dom";
import { FiCalendar, FiMapPin, FiBookmark } from "react-icons/fi";
import { useBookmarks } from "../../context/BookmarkContext";
import { imageForCategory } from "../../constants/categoryAssets";

export default function EventCard({ event = {} }) {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const saved = bookmarks.some((b) => b.id === event.id);
  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#2c2038] bg-[#130e1c] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#34e4ea] hover:shadow-[0_18px_40px_-15px_rgba(52,228,234,0.35)]">
      <Link to={`/events/${event.id || "demo"}`} className="flex min-w-0 flex-1 flex-col">
        <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-700/60 to-indigo-900/70">
          <img src={event.image || imageForCategory(event.category)} alt={event.title || "Event"} loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[9px] font-extrabold tracking-wider text-cyan-300 backdrop-blur-sm">EVENT</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4">
          <h3 className="break-words text-sm font-semibold text-white">{event.title || "Fandom Event"}</h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#a79bc0]">
            <span className="inline-flex min-w-0 items-center gap-1"><FiCalendar size={12} />{event.date || "TBA"}</span>
            <span className="inline-flex min-w-0 items-center gap-1"><FiMapPin size={12} />{event.location || "Global"}</span>
          </div>
          {event.description && <p className="line-clamp-2 text-xs text-[#a79bc0]">{event.description}</p>}
        </div>
      </Link>
      <button type="button" aria-label={saved ? "Remove bookmark" : "Bookmark event"} onClick={() => toggleBookmark({ ...event, kind: "events" })} className={`absolute right-3 top-3 z-10 rounded-full p-2 ${saved ? "bg-[#ff3e9e] text-white" : "bg-black/55 text-white"}`}><FiBookmark size={14} /></button>
    </article>
  );
}
