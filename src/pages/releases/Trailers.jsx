import { useEffect, useMemo, useState } from "react";
import ContentCard from "../../components/cards/ContentCard";
import FilterPill from "../../components/ui/FilterPill";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

const CATEGORIES = ["All", "anime", "gaming", "movies", "tvshows", "kpop", "comics", "manga"];
const STATUS = ["All", "UPCOMING", "RECENTLY RELEASED"];

export default function Trailers() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    Promise.all(CATEGORIES.slice(1).map((slug) => fetch(`/data/${slug}.json`).then((response) => response.ok ? response.json() : [])))
      .then((groups) => setItems(groups.flat().filter((item) => item.type === "VIDEO" || item.type === "TRAILER")))
      .catch(() => setItems([]));
  }, []);

  const visible = useMemo(() => items.filter((item) => {
    const categoryMatch = category === "All" || item.category === category;
    const statusMatch = status === "All" || item.releaseStatus === status;
    return categoryMatch && statusMatch;
  }), [items, category, status]);

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Trailers" }]} />
      <span className="eyebrow">Trailer Vault</span>
      <h1>Watch what’s next.</h1>
      <p>One place for FandomVerse video and trailer records, embedded from the responsive links stored in the local datasets.</p>

      <div className="filters" aria-label="Trailer category filters">
        {CATEGORIES.map((value) => <FilterPill key={value} active={category === value} onClick={() => setCategory(value)}>{value === "All" ? "All" : value === "tvshows" ? "TV Shows" : value.toUpperCase()}</FilterPill>)}
      </div>
      <div className="filters" aria-label="Trailer release status filters">
        {STATUS.map((value) => <FilterPill key={value} active={status === value} onClick={() => setStatus(value)}>{value}</FilterPill>)}
      </div>

      {visible.length ? <div className="grid grid-3">{visible.map((item) => <ContentCard key={item.id} item={item} />)}</div> : <div className="empty"><h3>No trailers match these filters</h3><p>Try another category or release status.</p></div>}
    </div>
  );
}
