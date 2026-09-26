import { useEffect, useState } from "react";
import MerchCard from "../../components/MerchCard";

const CATEGORIES = [
  "all",
  "anime",
  "gaming",
  "movies",
  "tvshows",
  "kpop",
  "comics",
  "manga",
];

export default function Merchandise() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/data/merch.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load merch data");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading merch:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const inStockProducts = filteredProducts.filter((p) => p.inStock);
  const outOfStockProducts = filteredProducts.filter((p) => !p.inStock);
  const displayProducts = [...inStockProducts, ...outOfStockProducts];

  if (loading) {
    return (
      <div className="container page">
        <span className="eyebrow">Merchandise</span>
        <h1>Curated fandom finds.</h1>
        <div className="grid grid-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="card">
              <div className="media-placeholder" style={{ minHeight: 180 }} />
              <div className="card-body">
                <div className="h-4 bg-[#21152d] rounded w-3/4 animate-pulse mb-2" />
                <div className="h-3 bg-[#21152d] rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <span className="eyebrow">Merchandise</span>
      <h1>Curated fandom finds.</h1>
      <div className="filters" role="group" aria-label="Category filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`button ${activeCategory === cat ? "primary" : "ghost"}`}
            aria-pressed={activeCategory === cat}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      {displayProducts.length > 0 ? (
        <div className="grid grid-4">
          {displayProducts.map((product) => (
            <MerchCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No products found</h3>
          <p>Try a different category or check back later.</p>
        </div>
      )}
    </div>
  );
}