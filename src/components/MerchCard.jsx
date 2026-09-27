import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function MerchCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/store/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#2c2038] bg-[#130e1c] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#9b5cff] hover:shadow-[0_18px_40px_-15px_rgba(155,92,255,0.4)]"
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-violet-700/60 to-fuchsia-900/60">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : null}
        <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[9px] font-extrabold tracking-wider text-violet-300 backdrop-blur-sm z-10">
          {product.category.toUpperCase()}
        </span>
        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-md bg-red-500/90 px-2 py-1 text-[9px] font-extrabold tracking-wider text-white backdrop-blur-sm z-10">
            OUT OF STOCK
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-sm font-semibold text-white line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-[#a79bc0]">{product.franchise || product.details?.franchise || "Fandom collection"}</p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-sm font-bold text-white">
            {product.priceRange}
          </span>
          {product.inStock && addToCart && (
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-full bg-gradient-to-r from-[#ff3e9e] to-[#9b5cff] px-3 py-1.5 text-[11px] font-bold text-white transition hover:opacity-90 active:scale-95"
            >
              Add to Cart
            </button>
          )}
          {!product.inStock && (
            <span className="rounded-full bg-[#3a1f3a] px-3 py-1.5 text-[11px] font-bold text-red-400">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
