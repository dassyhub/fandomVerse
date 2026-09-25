export default function FilterPill({ children, active = false, ...props }) {
  return (
    <button
      type="button"
      className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 ${
        active
          ? "bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] text-white"
          : "border border-[#2c2038] bg-[#150f1d] text-[#c9bfd9] hover:border-[#7447a1] hover:text-white"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
