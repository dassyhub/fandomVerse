import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ContentCard from "../../components/cards/ContentCard";

const INTERESTS = [
  ["Anime", "anime"],
  ["Gaming", "gaming"],
  ["Movies", "movies"],
  ["TV Shows", "tvshows"],
  ["K-Pop", "kpop"],
  ["Comics", "comics"],
  ["Manga", "manga"],
];

export default function FandomMatch() {
  const [selected, setSelected] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    Promise.all(INTERESTS.map(([, slug]) => fetch(`/data/${slug}.json`).then((response) => response.ok ? response.json() : [])))
      .then((groups) => setContent(groups.flat()))
      .catch(() => setContent([]));
  }, []);

  const matches = useMemo(() => {
    if (!selected.length) return [];
    return content
      .filter((item) => selected.includes(item.category))
      .sort((a, b) => Number(b.popularity || 0) - Number(a.popularity || 0) || Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
      .slice(0, 6);
  }, [content, selected]);

  return (
    <div className="container page">
      <span className="eyebrow">Fandom Match</span>
      <h1>Find your next obsession.</h1>
      <p>Pick the fandoms you enjoy and FandomVerse will surface the strongest matching local content records.</p>

      <div className="filters" aria-label="Fandom interests">
        {INTERESTS.map(([label, slug]) => (
          <button key={slug} type="button" className={`button ${selected.includes(slug) ? "primary" : "ghost"}`} onClick={() => setSelected((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug])} aria-pressed={selected.includes(slug)}>{label}</button>
        ))}
      </div>

      {!selected.length ? (
        <div className="empty section"><h3>Choose at least one fandom</h3><p>Your matching content will appear here.</p></div>
      ) : matches.length ? (
        <section className="section">
          <div className="section-title"><div><span className="eyebrow">Matched content</span><h2>Built from your interests</h2></div><Link className="button ghost" to="/explore">Explore all</Link></div>
          <div className="grid grid-3">{matches.map((item) => <ContentCard key={item.id} item={item} />)}</div>
        </section>
      ) : (
        <div className="empty section"><h3>No matching records yet</h3><p>Try selecting another fandom category.</p></div>
      )}
    </div>
  );
}
