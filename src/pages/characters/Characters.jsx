import { useEffect, useMemo, useState } from "react";
import CharacterCard from "../../components/cards/CharacterCard";
import FilterPill from "../../components/ui/FilterPill";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

const CATEGORIES = ["All", "anime", "gaming", "movies", "tvshows", "kpop", "comics", "manga"];
const labelFor = (value) => value === "tvshows" ? "TV Shows" : value === "All" ? "All" : value.toUpperCase();

export default function Characters() {
  const [chars, setChars] = useState([]);
  const [category, setCategory] = useState("All");
  const [series, setSeries] = useState("All");
  const [sort, setSort] = useState("A–Z");

  useEffect(() => {
    fetch("/data/characters.json")
      .then((response) => response.json())
      .then(setChars)
      .catch(() => setChars([]));
  }, []);

  const seriesOptions = useMemo(() => {
    const source = category === "All" ? chars : chars.filter((item) => item.category === category);
    return ["All", ...Array.from(new Set(source.map((item) => item.series).filter(Boolean))).sort((a, b) => a.localeCompare(b))];
  }, [chars, category]);

  useEffect(() => {
    if (!seriesOptions.includes(series)) setSeries("All");
  }, [seriesOptions, series]);

  const visible = useMemo(() => {
    const filtered = chars.filter((item) =>
      (category === "All" || item.category === category) &&
      (series === "All" || item.series === series),
    );
    return filtered.sort((a, b) => sort === "A–Z" ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category));
  }, [chars, category, series, sort]);

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Characters" }]} />
      <span className="eyebrow">Character Profiles</span>
      <h1>Meet the characters.</h1>
      <p>Explore the FandomVerse character directory by category and franchise.</p>

      <div className="filters" aria-label="Character category filters">
        {CATEGORIES.map((value) => <FilterPill key={value} active={category === value} onClick={() => setCategory(value)}>{labelFor(value)}</FilterPill>)}
      </div>

      <div className="filters" aria-label="Character franchise filters">
        {seriesOptions.map((value) => <FilterPill key={value} active={series === value} onClick={() => setSeries(value)}>{value}</FilterPill>)}
        <FilterPill active={sort === "A–Z"} onClick={() => setSort(sort === "A–Z" ? "Category" : "A–Z")}>{sort === "A–Z" ? "A–Z" : "Category"}</FilterPill>
      </div>

      {visible.length ? (
        <div className="grid grid-3">{visible.map((character) => <CharacterCard character={character} key={character.id} />)}</div>
      ) : (
        <div className="empty"><h3>No characters found</h3><p>Try another category or franchise.</p></div>
      )}
    </div>
  );
}
