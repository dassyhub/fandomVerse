import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [] }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-[#8b7ea3] sm:text-sm">
      <Link to="/" className="hover:text-white">Home</Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <span>/</span>
          {item.to ? (
            <Link to={item.to} className="hover:text-white">{item.label}</Link>
          ) : (
            <span className="font-semibold text-[#34e4ea]">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
