import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FiCompass } from "react-icons/fi";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import ContentCard from "../../components/cards/ContentCard";
import CharacterCard from "../../components/cards/CharacterCard";
import EventCard from "../../components/cards/EventCard";
import ProductCard from "../../components/cards/ProductCard";
import FilterPill from "../../components/ui/FilterPill";
import { CATEGORY_ICONS } from "../../constants/categoryIcons";

const FILTERS = ["All", "Articles", "Gallery", "Videos", "Audio", "Characters", "Events", "Merchandise", "Releases"];
const SORTS = ["Featured", "Newest", "A–Z", "Popular"];
const typeToFilter = (type) => {
  if (type === "ARTICLE") return "Articles";
  if (type === "GALLERY") return "Gallery";
  if (type === "AUDIO") return "Audio";
  if (type === "VIDEO" || type === "TRAILER") return "Videos";
  return "All";
};

function sortRecords(records, sort, key = "title") {
  return [...records].sort((a, b) => {
    if (sort === "A–Z") return String(a[key] || "").localeCompare(String(b[key] || ""));
    if (sort === "Popular") return Number(b.popularity || 0) - Number(a.popularity || 0);
    if (sort === "Featured") return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || String(a[key] || "").localeCompare(String(b[key] || ""));
    const aDate = new Date(a.publishedAt || a.date || 0).getTime();
    const bDate = new Date(b.publishedAt || b.date || 0).getTime();
    return bDate - aDate;
  });
}

export default function CategoryHub() {
  const { category = "anime" } = useParams();
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [events, setEvents] = useState([]);
  const [merch, setMerch] = useState([]);
  const [releases, setReleases] = useState([]);
  const [filter, setFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilter("All");
    setTagFilter("All");
    setLoading(true);

    Promise.all([
      fetch("/data/categories.json"),
      fetch(`/data/${category}.json`),
      fetch("/data/characters.json"),
      fetch("/data/events.json"),
      fetch("/data/merch.json"),
      fetch("/data/releases.json"),
    ])
      .then(async (responses) => Promise.all(responses.map((response) => (response.ok ? response.json() : []))))
      .then(([categoryData, contentData, characterData, eventData, merchData, releaseData]) => {
        setCategories(categoryData);
        setContent(contentData);
        setCharacters(characterData.filter((item) => item.category === category));
        setEvents(eventData.filter((item) => item.category === category));
        setMerch(merchData.filter((item) => item.category === category));
        setReleases(releaseData.filter((item) => item.category === category));
      })
      .catch(() => {
        setContent([]); setCharacters([]); setEvents([]); setMerch([]); setReleases([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  const meta = useMemo(() => {
    const categoryRecord = categories.find((item) => item.slug === category);
    const iconRecord = CATEGORY_ICONS[category] || { icon: FiCompass, color: "#a79bc0" };
    return {
      label: categoryRecord?.label || category,
      description: categoryRecord?.description || "",
      icon: iconRecord.icon,
      color: iconRecord.color,
    };
  }, [categories, category]);

  const tags = useMemo(() => {
    const values = content.flatMap((item) => item.tags || []).filter(Boolean);
    return ["All", ...Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))];
  }, [content]);

  const filteredContent = useMemo(() => {
    const byTag = tagFilter === "All" ? content : content.filter((item) => (item.tags || []).includes(tagFilter));
    return sortRecords(byTag, sort, "title");
  }, [content, sort, tagFilter]);

  const sortedCharacters = useMemo(() => sortRecords(characters, sort, "name"), [characters, sort]);
  const sortedEvents = useMemo(() => sortRecords(events, sort, "title"), [events, sort]);
  const sortedMerch = useMemo(() => sortRecords(merch, sort, "name"), [merch, sort]);
  const sortedReleases = useMemo(() => sortRecords(releases, sort, "title"), [releases, sort]);

  const showContent = filter === "All" || ["Articles", "Gallery", "Videos", "Audio"].includes(filter);
  const visibleContent = filter === "All" ? filteredContent : filteredContent.filter((item) => typeToFilter(item.type) === filter);
  const showCharacters = filter === "All" || filter === "Characters";
  const showEvents = filter === "All" || filter === "Events";
  const showMerch = filter === "All" || filter === "Merchandise";
  const showReleases = filter === "All" || filter === "Releases";
  const hasResults = visibleContent.length || (showCharacters && sortedCharacters.length) || (showEvents && sortedEvents.length) || (showMerch && sortedMerch.length) || (showReleases && sortedReleases.length);

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: meta.label }]} />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="flex items-center gap-3 text-3xl font-black sm:text-4xl">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${meta.color}22`, color: meta.color }}><meta.icon size={22} /></span>
            <span className="break-words">{meta.label}</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm">{meta.description}</p>
        </div>
        <div className="filters mb-0" aria-label="Sort content">
          {SORTS.map((value) => <FilterPill key={value} active={sort === value} onClick={() => setSort(value)}>{value}</FilterPill>)}
        </div>
      </div>

      <div className="filters" aria-label="Content type filters">
        {FILTERS.map((value) => <FilterPill key={value} active={filter === value} onClick={() => setFilter(value)}>{value}</FilterPill>)}
      </div>

      {tags.length > 1 && (
        <div className="filters mt-0" aria-label="Category tag filters">
          {tags.map((tag) => <FilterPill key={tag} active={tagFilter === tag} onClick={() => setTagFilter(tag)}>{tag}</FilterPill>)}
        </div>
      )}

      {loading ? (
        <div className="grid grid-4 section" aria-label={`Loading ${meta.label} content`}>
          {[1,2,3,4,5,6,7,8].map((item) => <div className="card media-placeholder min-h-48 animate-pulse" key={item} aria-hidden="true" />)}
        </div>
      ) : (
        <>
          {showContent && visibleContent.length > 0 && <section className="section"><div className="section-title"><div><span className="eyebrow">Discover</span><h2>{meta.label} content</h2></div><span className="text-xs text-[#a79bc0]">{visibleContent.length} items</span></div><div className="grid grid-4">{visibleContent.map((item) => <ContentCard key={item.id} item={item} />)}</div></section>}
          {showCharacters && sortedCharacters.length > 0 && <section className="section"><div className="section-title"><h2>Characters</h2><span className="text-xs text-[#a79bc0]">{sortedCharacters.length} profiles</span></div><div className="grid grid-3">{sortedCharacters.map((item) => <CharacterCard key={item.id} character={item} />)}</div></section>}
          {showEvents && sortedEvents.length > 0 && <section className="section"><div className="section-title"><h2>Events</h2><span className="text-xs text-[#a79bc0]">{sortedEvents.length} events</span></div><div className="grid grid-3">{sortedEvents.map((item) => <EventCard key={item.id} event={item} />)}</div></section>}
          {showMerch && sortedMerch.length > 0 && <section className="section"><div className="section-title"><h2>Merchandise</h2><span className="text-xs text-[#a79bc0]">{sortedMerch.length} items</span></div><div className="grid grid-4">{sortedMerch.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
          {showReleases && sortedReleases.length > 0 && <section className="section"><div className="section-title"><h2>Releases</h2><span className="text-xs text-[#a79bc0]">{sortedReleases.length} releases</span></div><div className="grid grid-3">{sortedReleases.map((item) => <article key={item.id} className="card card-body"><span className="tag">{item.status}</span><h3 className="mt-3">{item.title}</h3><p>{item.description}</p><p className="text-xs">{item.date}</p></article>)}</div></section>}
          {!hasResults && <div className="empty section"><h3>No matching content found</h3><p>Try another type or tag for this category.</p></div>}
        </>
      )}
    </div>
  );
}
