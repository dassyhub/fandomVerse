import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/ui/SearchBar";
import FilterPill from "../../components/ui/FilterPill";
import ContentCard from "../../components/cards/ContentCard";
import CharacterCard from "../../components/cards/CharacterCard";
import EventCard from "../../components/cards/EventCard";
import ProductCard from "../../components/cards/ProductCard";

const CATEGORIES = ["All", "anime", "gaming", "movies", "tvshows", "kpop", "comics", "manga"];
const TYPES = ["All", "Content", "Characters", "Events", "Merchandise", "Releases"];
const categoryLabel = (value) => (value === "tvshows" ? "TV Shows" : value === "All" ? "All" : value.toUpperCase());

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [data, setData] = useState({ content: [], characters: [], events: [], merch: [], releases: [] });

  useEffect(() => setQuery(params.get("q") || ""), [params]);

  useEffect(() => {
    const categories = CATEGORIES.slice(1);
    Promise.all([
      ...categories.map((category) => fetch(`/data/${category}.json`).then((response) => (response.ok ? response.json() : []))),
      fetch("/data/characters.json").then((response) => (response.ok ? response.json() : [])),
      fetch("/data/events.json").then((response) => (response.ok ? response.json() : [])),
      fetch("/data/merch.json").then((response) => (response.ok ? response.json() : [])),
      fetch("/data/releases.json").then((response) => (response.ok ? response.json() : [])),
    ]).then((all) => {
      setData({
        content: all.slice(0, 7).flat(),
        characters: all[7] || [],
        events: all[8] || [],
        merch: all[9] || [],
        releases: all[10] || [],
      });
    });
  }, []);

  const term = query.trim().toLowerCase();
  const matches = (item) => {
    const categoryMatches = categoryFilter === "All" || item.category === categoryFilter;
    const textMatches = !term || [
      item.title,
      item.name,
      item.description,
      item.series,
      item.category,
      item.type,
      ...(item.tags || []),
    ].some((value) => String(value || "").toLowerCase().includes(term));
    return categoryMatches && textMatches;
  };

  const results = useMemo(() => ({
    content: data.content.filter(matches),
    characters: data.characters.filter(matches),
    events: data.events.filter(matches),
    merch: data.merch.filter(matches),
    releases: data.releases.filter(matches),
  }), [data, term, categoryFilter]);

  const visibleResults = useMemo(() => {
    if (typeFilter === "Content") return { content: results.content, characters: [], events: [], merch: [], releases: [] };
    if (typeFilter === "Characters") return { content: [], characters: results.characters, events: [], merch: [], releases: [] };
    if (typeFilter === "Events") return { content: [], characters: [], events: results.events, merch: [], releases: [] };
    if (typeFilter === "Merchandise") return { content: [], characters: [], events: [], merch: results.merch, releases: [] };
    if (typeFilter === "Releases") return { content: [], characters: [], events: [], merch: [], releases: results.releases };
    return results;
  }, [results, typeFilter]);

  const empty = !Object.values(visibleResults).some((items) => items.length);

  const submit = () => setParams(query.trim() ? { q: query.trim() } : {});

  return (
    <div className="container page">
      <span className="eyebrow">Global Search</span>
      <h1>Find your fandom.</h1>
      <p className="max-w-2xl">Search across the pre-populated FandomVerse datasets, then narrow the results by category or content type.</p>

      <div className="mt-5 max-w-3xl">
        <SearchBar value={query} onChange={(event) => setQuery(event.target.value)} onSubmit={submit} placeholder="Search anime, characters, events, merch..." />
      </div>

      <div className="filters" aria-label="Search content type filters">
        {TYPES.map((label) => (
          <FilterPill key={label} active={typeFilter === label} onClick={() => setTypeFilter(label)}>{label}</FilterPill>
        ))}
      </div>

      <div className="filters" aria-label="Search category filters">
        {CATEGORIES.map((category) => (
          <FilterPill key={category} active={categoryFilter === category} onClick={() => setCategoryFilter(category)}>
            {categoryLabel(category)}
          </FilterPill>
        ))}
      </div>

      <p className="text-sm">{term ? `Results for “${query}”` : "Showing the latest records across FandomVerse."}</p>

      {visibleResults.content.length > 0 && (
        <section className="section"><h2>Content</h2><div className="grid grid-4">{visibleResults.content.map((item) => <ContentCard key={item.id} item={item} />)}</div></section>
      )}
      {visibleResults.characters.length > 0 && (
        <section className="section"><h2>Characters</h2><div className="grid grid-4">{visibleResults.characters.map((item) => <CharacterCard key={item.id} character={item} />)}</div></section>
      )}
      {visibleResults.events.length > 0 && (
        <section className="section"><h2>Events</h2><div className="grid grid-3">{visibleResults.events.map((item) => <EventCard key={item.id} event={item} />)}</div></section>
      )}
      {visibleResults.merch.length > 0 && (
        <section className="section"><h2>Merchandise</h2><div className="grid grid-4">{visibleResults.merch.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>
      )}
      {visibleResults.releases.length > 0 && (
        <section className="section"><h2>Releases</h2><div className="grid grid-3">{visibleResults.releases.map((item) => <Link key={item.id} to={item.link || `/category/${item.category}`} className="card card-body"><span className="tag">{item.status || "UPCOMING"}</span><h3>{item.title}</h3><p>{item.description}</p><span className="text-xs text-[#a79bc0]">{item.date || "Date TBA"}</span></Link>)}</div></section>
      )}

      {empty && (
        <div className="empty section">
          <h3>{term || categoryFilter !== "All" || typeFilter !== "All" ? "No matching results" : "No results available"}</h3>
          <p>Try another keyword, category, or content type.</p>
        </div>
      )}
    </div>
  );
}
