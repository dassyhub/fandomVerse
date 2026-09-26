import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FiCompass } from "react-icons/fi";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import ContentCard from "../../components/cards/ContentCard";
import CharacterCard from "../../components/cards/CharacterCard";
import EventCard from "../../components/cards/EventCard";
import ProductCard from "../../components/cards/ProductCard";
import FilterPill from "../../components/ui/FilterPill";
import { CATEGORY_ICONS } from "../../constants/categoryIcons";                 // icons/colors (not JSON-safe)

const FILTERS = [
  "All",
  "Articles",
  "Gallery",
  "Videos",
  "Characters",
  "Events",
  "Merchandise",
];
const SORTS = ["Newest", "A–Z", "Popular"];

function typeToFilter(type) {
  if (type === "ARTICLE") return "Articles";
  if (type === "GALLERY") return "Gallery";
  if (type === "VIDEO" || type === "TRAILER" || type === "AUDIO")
    return "Videos";
  return "All";
}

export default function CategoryHub() {
  const { category = "anime" } = useParams();

  const [categories, setCategories] = useState([]); // now used below
  const [content, setContent] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [events, setEvents] = useState([]);
  const [merch, setMerch] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    let cancelled = false;
    setFilter("All");
    Promise.all([
      fetch("/data/categories.json").then((r) => (r.ok ? r.json() : [])),
      fetch(`/data/${category}.json`).then((r) => (r.ok ? r.json() : [])),
      fetch(`/data/characters.json`).then((r) => (r.ok ? r.json() : [])),
      fetch(`/data/events.json`).then((r) => (r.ok ? r.json() : [])),
      fetch(`/data/merchandise.json`).then((r) => (r.ok ? r.json() : [])),
    ]).then(([categoryData, contentData, charData, eventData, merchData]) => {
      if (cancelled) return;
      setCategories(Array.isArray(categoryData) ? categoryData : []);
      setContent(Array.isArray(contentData) ? contentData : []);
      setCharacters((charData || []).filter((c) => c.category === category));
      setEvents((eventData || []).filter((e) => e.category === category));
      setMerch((merchData || []).filter((m) => m.category === category));
    });
    return () => {
      cancelled = true;
    };
  }, [category]);

  // merge: JSON (label/desc) + constants (icon/color)
  const meta = useMemo(() => {
    const fromJson = categories.find((item) => item.slug === category);
    const iconData = CATEGORY_ICONS[category] || {
      icon: FiCompass,
      color: "#a79bc0",
    };

    return {
      label: fromJson?.label || category,
      description: fromJson?.description || "",
      icon: iconData.icon,
      color: iconData.color,
    };
  }, [categories, category]);

  const sortFn = (a, b, key) => {
    if (sort === "A–Z") return (a[key] || "").localeCompare(b[key] || "");
    if (sort === "Popular")
      return (b[key] || "").length - (a[key] || "").length;
    return 0; // "Newest" = original/JSON order
  };

  const sortedContent = useMemo(
    () => [...content].sort((a, b) => sortFn(a, b, "title")),
    [content, sort],
  );
  const sortedCharacters = useMemo(
    () => [...characters].sort((a, b) => sortFn(a, b, "name")),
    [characters, sort],
  );
  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => sortFn(a, b, "title")),
    [events, sort],
  );
  const sortedMerch = useMemo(
    () => [...merch].sort((a, b) => sortFn(a, b, "name")),
    [merch, sort],
  );

  const showContent =
    filter === "All" ||
    sortedContent.some((c) => typeToFilter(c.type) === filter);
  const showCharacters = filter === "All" || filter === "Characters";
  const showEvents = filter === "All" || filter === "Events";
  const showMerch = filter === "All" || filter === "Merchandise";

  const visibleContent =
    filter === "All"
      ? sortedContent
      : sortedContent.filter((c) => typeToFilter(c.type) === filter);

  const totalVisible =
    (showContent ? visibleContent.length : 0) +
    (showCharacters ? sortedCharacters.length : 0) +
    (showEvents ? sortedEvents.length : 0) +
    (showMerch ? sortedMerch.length : 0);

  return (
    <div className="mx-auto max-w-384 px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <Breadcrumbs items={[{ label: meta.label }]} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black text-white sm:text-4xl">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${meta.color}22`, color: meta.color }}
            >
              <meta.icon size={22} />
            </span>
            {meta.label}
          </h1>
          {/* renders when categories.json has loaded and matched */}
          {meta.description && (
            <p className="mt-2 max-w-xl text-sm text-[#a79bc0]">
              {meta.description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {SORTS.map((s) => (
            <FilterPill key={s} active={sort === s} onClick={() => setSort(s)}>
              {s}
            </FilterPill>
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((f) => (
          <FilterPill
            key={f}
            active={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </FilterPill>
        ))}
      </div>

      {totalVisible === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-[#3a2c4a] p-12 text-center text-sm text-[#8b7ea3]">
          No matching content found. Try a different filter.
        </div>
      )}

      {showContent && visibleContent.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleContent.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {showCharacters && sortedCharacters.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-white">Characters</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {sortedCharacters.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
        </section>
      )}

      {showEvents && sortedEvents.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-white">Events</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}

      {showMerch && sortedMerch.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-white">Merchandise</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {sortedMerch.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}