import { useEffect, useMemo, useState } from "react";
import ContentCard from "../../components/cards/ContentCard";

const CATEGORIES = ["anime", "gaming", "movies", "tvshows", "kpop", "comics", "manga"];
const labelFor = (value) => value === "tvshows" ? "TV Shows" : value.toUpperCase();

export default function FanPulse() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    Promise.all(CATEGORIES.map((slug) => fetch(`/data/${slug}.json`).then((response) => response.ok ? response.json() : [])))
      .then((groups) => setData(groups.flat()))
      .catch(() => setData([]));
  }, []);

  const trending = useMemo(() => data
    .filter((item) => category === "All" || item.category === category)
    .sort((a, b) => Number(b.popularity || 0) - Number(a.popularity || 0) || Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .slice(0, 9), [data, category]);

  return (
    <div className="container page">
      <span className="eyebrow">Fan Pulse</span>
      <h1>What's hot right now?</h1>
      <p>Trending local FandomVerse records ranked from the popularity and featured fields in the content dataset.</p>

      <div className="filters" aria-label="Fan Pulse categories">
        <button className={`button ${category === "All" ? "primary" : "ghost"}`} onClick={() => setCategory("All")} type="button">All</button>
        {CATEGORIES.map((value) => <button key={value} className={`button ${category === value ? "primary" : "ghost"}`} onClick={() => setCategory(value)} type="button">{labelFor(value)}</button>)}
      </div>

      {trending.length ? (
        <>
          <div className="grid grid-3 section">
            {trending.slice(0, 3).map((item, index) => <article className="card card-body" key={item.id}><span className="tag">{index === 0 ? "TOP PULSE" : "RISING"}</span><h2 className="mt-3">{item.title}</h2><p>{item.description}</p><span className="text-xs text-[#a79bc0]">Pulse score: {item.popularity || "—"}</span></article>)}
          </div>
          <section className="section"><h2>Explore the pulse</h2><div className="grid grid-3">{trending.slice(3).map((item) => <ContentCard item={item} key={item.id} />)}</div></section>
        </>
      ) : <div className="empty section"><h3>No pulse data available</h3><p>Try another category.</p></div>}
    </div>
  );
}
