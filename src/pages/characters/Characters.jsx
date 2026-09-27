import { useEffect, useMemo, useState } from "react";
import CharacterCard from "../../components/cards/CharacterCard";
import FilterPill from "../../components/ui/FilterPill";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

const cats = ["All", "anime", "gaming", "movies", "tvshows", "kpop", "comics", "manga"];
export default function Characters() {
  const [chars, setChars] = useState([]); const [filter, setFilter] = useState("All"); const [sort, setSort] = useState("Newest");
  useEffect(() => { fetch("/data/characters.json").then(r => r.json()).then(setChars).catch(() => setChars([])); }, []);
  const visible = useMemo(() => [...chars].filter(c => filter === "All" || c.category === filter).sort((a,b) => sort === "A-Z" ? a.name.localeCompare(b.name) : 0), [chars, filter, sort]);
  return <div className="container page"><Breadcrumbs items={[{label:"Characters"}]} /><span className="eyebrow">Characters</span><h1>Meet the characters.</h1><p>Explore original characters across every FandomVerse category.</p><div className="filters">{cats.map(c => <FilterPill key={c} active={filter === c} onClick={() => setFilter(c)}>{c === "All" ? c : c === "tvshows" ? "TV Shows" : c.toUpperCase()}</FilterPill>)}<FilterPill active={sort === "A-Z"} onClick={() => setSort(sort === "A-Z" ? "Newest" : "A-Z")}>A-Z</FilterPill></div>{visible.length ? <div className="grid grid-3">{visible.map(c => <CharacterCard character={c} key={c.id}/>)}</div> : <div className="empty">No characters found.</div>}</div>;
}
