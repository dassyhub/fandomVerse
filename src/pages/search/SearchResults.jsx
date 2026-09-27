import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/ui/SearchBar";
import FilterPill from "../../components/ui/FilterPill";
import ContentCard from "../../components/cards/ContentCard";
import CharacterCard from "../../components/cards/CharacterCard";
import EventCard from "../../components/cards/EventCard";
import ProductCard from "../../components/cards/ProductCard";
const categories = ["anime", "gaming", "movies", "tvshows", "kpop", "comics", "manga"];

export default function SearchResults() {
  const [params, setParams] = useSearchParams(); const [query, setQuery] = useState(params.get("q") || ""); const [filter, setFilter] = useState("All");
  const [data, setData] = useState({ content: [], characters: [], events: [], merch: [], releases: [] });
  useEffect(() => setQuery(params.get("q") || ""), [params]);
  useEffect(() => { Promise.all([...categories.map((category) => fetch(`/data/${category}.json`).then((r) => r.ok ? r.json() : [])), fetch("/data/characters.json").then((r) => r.ok ? r.json() : []), fetch("/data/events.json").then((r) => r.ok ? r.json() : []), fetch("/data/merch.json").then((r) => r.ok ? r.json() : []), fetch("/data/releases.json").then((r) => r.ok ? r.json() : [])]).then((all) => setData({ content: all.slice(0, 7).flat(), characters: all[7], events: all[8], merch: all[9], releases: all[10] })); }, []);
  const normalise = (value) => String(value || "").toLowerCase(); const term = normalise(query);
  const matches = (item) => !term || [item.title, item.name, item.description, item.series, item.category, item.type, ...(item.tags || [])].some((value) => normalise(value).includes(term));
  const results = useMemo(() => Object.fromEntries(Object.entries(data).map(([kind, records]) => [kind, records.filter(matches)])), [data, term]);
  const show = (label) => filter === "All" || filter === label;
  const empty = !Object.values(results).some((items) => items.length);
  return <div className="container page"><span className="eyebrow">Search</span><h1>Find your fandom.</h1><div className="mt-5 max-w-2xl"><SearchBar value={query} onChange={(event) => setQuery(event.target.value)} onSubmit={() => setParams(query ? { q: query } : {})} /></div><div className="filters">{["All", "Content", "Characters", "Events", "Merchandise", "Releases"].map((label) => <FilterPill key={label} active={filter === label} onClick={() => setFilter(label)}>{label}</FilterPill>)}</div><p className="text-sm">{term ? `Results for “${query}”` : "Search across all FandomVerse content."}</p>{show("Content") && results.content.length > 0 && <section className="section"><h2>Content</h2><div className="grid grid-4">{results.content.map((item) => <ContentCard key={item.id} item={item} />)}</div></section>}{show("Characters") && results.characters.length > 0 && <section className="section"><h2>Characters</h2><div className="grid grid-4">{results.characters.map((item) => <CharacterCard key={item.id} character={item} />)}</div></section>}{show("Events") && results.events.length > 0 && <section className="section"><h2>Events</h2><div className="grid grid-3">{results.events.map((item) => <EventCard key={item.id} event={item} />)}</div></section>}{show("Merchandise") && results.merch.length > 0 && <section className="section"><h2>Merchandise</h2><div className="grid grid-4">{results.merch.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}{show("Releases") && results.releases.length > 0 && <section className="section"><h2>Releases</h2><div className="grid grid-3">{results.releases.map((item) => <Link key={item.id} to={item.link || `/category/${item.category}`} className="card card-body"><span className="tag">{item.status || "UPCOMING"}</span><h3>{item.title}</h3><p>{item.description}</p><span className="text-xs text-[#a79bc0]">{item.date || "Date TBA"}</span></Link>)}</div></section>}{empty && <div className="empty section"><h3>No results found</h3><p>Try a different keyword or filter.</p></div>}</div>;
}
