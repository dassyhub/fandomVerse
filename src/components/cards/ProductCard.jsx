import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product = {} }) {
  const cart = useCart() || {};
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#2c2038] bg-[#130e1c] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#9b5cff] hover:shadow-[0_18px_40px_-15px_rgba(155,92,255,0.4)]">
      <Link
        to={`/store/${product.id || "demo"}`}
        className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-violet-700/60 to-fuchsia-900/60"
      >
        {product.image && <img src={product.image} alt={product.name || ""} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
        <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[9px] font-extrabold tracking-wider text-violet-300 backdrop-blur-sm">
          MERCH
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <Link to={`/store/${product.id || "demo"}`}>
          <h3 className="text-sm font-semibold text-white">
            {product.name || "Fandom Product"}
          </h3>
        </Link>
        <p className="text-xs text-[#a79bc0]">
          {product.franchise || product.details?.franchise || "Fandom"}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-sm font-bold text-white">
            {typeof product.price === "number"
              ? `₦${product.price.toLocaleString()}`
              : product.price || "₦0"}
          </span>
          {cart.addToCart && (
            <button
              type="button"
              onClick={() => cart.addToCart(product)}
              className="rounded-full bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] px-3 py-1.5 text-[11px] font-bold text-white transition hover:opacity-90 active:scale-95"
            >
              + Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
