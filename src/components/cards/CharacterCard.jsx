import { Link } from "react-router-dom";

export default function CharacterCard({ character = {} }) {
  const id = character.id || "demo";
  return (
    <Link
      to={`/characters/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#2c2038] bg-[#130e1c] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#e64a9b] hover:shadow-[0_18px_40px_-15px_rgba(255,62,158,0.4)]"
    >
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-br from-pink-700/70 via-fuchsia-800/60 to-indigo-900/70">
        <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[9px] font-extrabold tracking-wider text-pink-300 backdrop-blur-sm">
          CHARACTER
        </span>
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-110 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.14),transparent_55%)]" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b7ea3]">
          {character.series || "Series"}
        </span>
        <h3 className="text-sm font-semibold text-white">
          {character.name || "Character Name"}
        </h3>
      </div>
    </Link>
  );
}
