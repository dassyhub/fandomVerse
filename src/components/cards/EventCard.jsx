import { Link } from "react-router-dom";
import { FiCalendar, FiMapPin } from "react-icons/fi";

export default function EventCard({ event = {} }) {
  return (
    <Link
      to={`/events/${event.id || "demo"}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#2c2038] bg-[#130e1c] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#34e4ea] hover:shadow-[0_18px_40px_-15px_rgba(52,228,234,0.35)]"
    >
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-700/60 to-indigo-900/70">
        <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[9px] font-extrabold tracking-wider text-cyan-300 backdrop-blur-sm">
          EVENT
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-sm font-semibold text-white">{event.title || "Fandom Event"}</h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#a79bc0]">
          <span className="inline-flex items-center gap-1"><FiCalendar size={12} />{event.date || "TBA"}</span>
          <span className="inline-flex items-center gap-1"><FiMapPin size={12} />{event.location || "Global"}</span>
        </div>
      </div>
    </Link>
  );
}
