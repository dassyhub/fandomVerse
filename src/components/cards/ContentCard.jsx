import { Link } from "react-router-dom";

const typeGradients = {
  ARTICLE: "from-fuchsia-600/70 to-indigo-700/70",
  VIDEO: "from-sky-600/70 to-indigo-800/70",
  TRAILER: "from-amber-600/70 to-fuchsia-800/70",
  GALLERY: "from-purple-600/70 to-violet-900/70",
  AUDIO: "from-teal-600/70 to-indigo-800/70",
};

export default function ContentCard({ item = {} }) {
  const type = item.type || "ARTICLE";
  const id = item.id || "demo";
  const routeType = type === "TRAILER" ? "video" : type.toLowerCase();

  return (
    <Link
      to={`/content/${routeType}/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#2c2038] bg-[#130e1c] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#7447a1] hover:shadow-[0_18px_40px_-15px_rgba(155,92,255,0.45)]"
    >
      <div
        className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${
          typeGradients[type] || typeGradients.ARTICLE
        }`}
      >
        <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[9px] font-extrabold tracking-wider text-cyan-300 backdrop-blur-sm">
          {type}
        </span>
        <div className="h-full w-full scale-100 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)] transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-white">
          {item.title || "Fandom Content"}
        </h3>
        {item.description && (
          <p className="line-clamp-2 text-xs text-[#a79bc0]">{item.description}</p>
        )}
        <span className="mt-auto pt-1 text-[11px] font-medium text-[#8b7ea3]">
          {item.meta || "View details"}
        </span>
      </div>
    </Link>
  );
}
