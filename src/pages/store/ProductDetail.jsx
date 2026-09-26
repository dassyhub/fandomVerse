import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/merch.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load product data");
        return res.json();
      })
      .then((data) => {
        const found = data.find((p) => p.id === id);
        if (found) {
          setProduct(found);
        } else {
          setError("Product not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading product:", err);
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container page">
        <div className="grid grid-2 gap-8">
          <div className="media-placeholder animate-pulse" style={{ minHeight: 420 }} />
          <div className="space-y-4">
            <div className="h-4 bg-[#21152d] rounded w-32 animate-pulse" />
            <div className="h-8 bg-[#21152d] rounded w-64 animate-pulse" />
            <div className="h-6 bg-[#21152d] rounded w-48 animate-pulse" />
            <div className="h-40 bg-[#21152d] rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container page">
        <div className="empty">
          <h3>{error || "Product not found"}</h3>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/store" className="button primary mt-4 inline-block">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product);
    }
  };

  return (
    <div className="container page">
      <Link to="/store" className="button ghost mb-6 inline-flex items-center gap-2">
        ← Back to Store
      </Link>
      <div className="grid grid-2 gap-8">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700/60 to-fuchsia-900/60">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-violet-300">
              NO IMAGE
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-red-500/90 px-4 py-2 rounded-lg text-lg font-bold text-white">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <span className="eyebrow">{product.category.toUpperCase()}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{product.name}</h1>
          <p className="text-[#a79bc0] mb-4">{product.details?.franchise || product.franchise}</p>
          <div className="text-3xl font-bold text-white mb-6">
            ${Number(product.price).toFixed(2)}
            <span className="text-lg font-normal text-[#9b91a8] ml-2">({product.priceRange})</span>
          </div>
          <p className="text-[#d8ccdf] mb-6 leading-relaxed">{product.description}</p>
          <div className="space-y-3 mb-6 p-4 bg-[#110d19] rounded-xl border border-[#30233d]">
            <h4 className="font-semibold text-white">Details</h4>
            <div className="grid grid-2 gap-2 text-sm">
              <div>
                <span className="text-[#9b91a8]">Material:</span>
                <span className="text-white ml-2">{product.details?.material}</span>
              </div>
              <div>
                <span className="text-[#9b91a8]">Sizes:</span>
                <span className="text-white ml-2">{product.details?.sizes?.join(", ")}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[#9b91a8]">Franchise:</span>
                <span className="text-white ml-2">{product.details?.franchise}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`button primary text-lg py-4 ${!product.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}