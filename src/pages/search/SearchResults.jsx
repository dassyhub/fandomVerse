import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import FilterPill from "../../components/ui/FilterPill";
import ContentCard from "../../components/cards/ContentCard";

export default function SearchResults() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const results = query ? [{ title: `Results for "${query}"`, type: "ARTICLE" }, { title: "Related Character", type: "CHARACTER" }] : [];
  return (
    <div className="container page">
      <div className="page-header"><span className="eyebrow">Global Search</span><h1>Find your next obsession.</h1></div>
      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="filters">{["All", "Anime", "Gaming", "Movies", "Characters", "Events", "Merchandise"].map((x, i) => <FilterPill key={x} active={i === 0}>{x}</FilterPill>)}</div>
      {results.length ? <div className="grid grid-3">{results.map((item, i) => <ContentCard item={{...item, id: i}} key={i} />)}</div> : <div className="empty"><h3>No results yet</h3><p>Start searching across FandomVerse.</p></div>}
    </div>
  );
}