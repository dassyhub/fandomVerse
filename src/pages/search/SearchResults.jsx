import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "../../components/ui/SearchBar";
import FilterPill from "../../components/ui/FilterPill";
import ContentCard from "../../components/cards/ContentCard";
import CharacterCard from "../../components/cards/CharacterCard";
import EventCard from "../../components/cards/EventCard";
import ProductCard from "../../components/cards/ProductCard";

const categorySlugs = [
  "anime",
  "gaming",
  "movies",
  "tvshows",
  "kpop",
  "comics",
  "manga",
];
const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();

export default function SearchResults() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categoryMeta, setCategoryMeta] = useState([]);
  const [content, setContent] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [events, setEvents] = useState([]);
  const [merch, setMerch] = useState([]);

  useEffect(() => {
    setQuery(params.get("q") || "");
  }, [params]);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch("/data/categories.json").then((response) =>
        response.ok ? response.json() : [],
      ),
      ...categorySlugs.map((slug) =>
        fetch(`/data/${slug}.json`).then((response) =>
          response.ok ? response.json() : [],
        ),
      ),
      fetch("/data/characters.json").then((response) =>
        response.ok ? response.json() : [],
      ),
      fetch("/data/events.json").then((response) =>
        response.ok ? response.json() : [],
      ),
      fetch("/data/merchandise.json").then((response) =>
        response.ok ? response.json() : [],
      ),
    ])
      .then(([categoriesData, ...rest]) => {
        if (cancelled) return;

        const categoryMap = (categoriesData || []).reduce((acc, item) => {
          acc[item.slug] = item;
          return acc;
        }, {});

        const categoryContent = [];
        const categoryFiles = rest.slice(0, categorySlugs.length);
        const charactersData = rest[categorySlugs.length];
        const eventsData = rest[categorySlugs.length + 1];
        const merchData = rest[categorySlugs.length + 2];

        categorySlugs.forEach((slug, index) => {
          const items = Array.isArray(categoryFiles[index])
            ? categoryFiles[index]
            : [];
          items.forEach((item) => {
            categoryContent.push({
              ...item,
              categorySlug: slug,
              categoryLabel: categoryMap[slug]?.label || slug,
            });
          });
        });

        setCategoryMeta(categoriesData || []);
        setContent(categoryContent);
        setCharacters(Array.isArray(charactersData) ? charactersData : []);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setMerch(Array.isArray(merchData) ? merchData : []);
      })
      .catch(() => {
        if (!cancelled) {
          setCategoryMeta([]);
          setContent([]);
          setCharacters([]);
          setEvents([]);
          setMerch([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filterOptions = useMemo(
    () => ["All", ...(categoryMeta || []).map((item) => item.label)],
    [categoryMeta],
  );

  const categoryKeyMap = useMemo(() => {
    return (categoryMeta || []).reduce((acc, item) => {
      const keys = [item.slug, item.id, item.label, item.name];
      keys.forEach((key) => {
        if (key) acc[normalize(key)] = item.slug;
      });
      return acc;
    }, {});
  }, [categoryMeta]);

  const matchesCategory = (item) => {
    if (categoryFilter === "All") return true;

    const filterKey = normalize(categoryFilter);
    const filterSlug = categoryKeyMap[filterKey] || filterKey;
    const values = [
      item?.category,
      item?.categorySlug,
      item?.categoryLabel,
      item?.slug,
      item?.id,
      item?.label,
      item?.name,
    ];

    return values.some((value) => {
      const normalizedValue = normalize(value);
      return normalizedValue === filterKey || normalizedValue === filterSlug;
    });
  };

  const matchingResults = useMemo(() => {
    const trimmedQuery = query.trim();
    const includesQuery = (value) =>
      trimmedQuery === "" || normalize(value).includes(normalize(trimmedQuery));

    const filteredContent = (content || []).filter((item) => {
      if (!matchesCategory(item)) return false;
      return [
        item.title,
        item.description,
        item.type,
        item.meta,
        item.category,
        item.categoryLabel,
      ].some(includesQuery);
    });

    const filteredCharacters = (characters || []).filter((item) => {
      if (!matchesCategory(item)) return false;
      return [
        item.name,
        item.series,
        item.bio,
        item.category,
        ...(Array.isArray(item.traits) ? item.traits : []),
      ].some(includesQuery);
    });

    const filteredEvents = (events || []).filter((item) => {
      if (!matchesCategory(item)) return false;
      return [
        item.title,
        item.description,
        item.location,
        item.date,
        item.category,
      ].some(includesQuery);
    });

    const filteredMerch = (merch || []).filter((item) => {
      if (!matchesCategory(item)) return false;
      return [item.name, item.franchise, item.description, item.category].some(
        includesQuery,
      );
    });

    return {
      content: filteredContent,
      characters: filteredCharacters,
      events: filteredEvents,
      merch: filteredMerch,
    };
  }, [
    categoryFilter,
    categoryKeyMap,
    characters,
    content,
    events,
    merch,
    query,
  ]);

  const totalResults =
    matchingResults.content.length +
    matchingResults.characters.length +
    matchingResults.events.length +
    matchingResults.merch.length;

  return (
    <div className="container page">
      <div className="page-header">
        <span className="eyebrow">Global Search</span>
        <h1>Find your next obsession.</h1>
      </div>

      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search anime, characters, events, merch..."
      />

      <div className="filters">
        {filterOptions.map((option) => (
          <FilterPill
            key={option}
            active={categoryFilter === option}
            onClick={() => setCategoryFilter(option)}
          >
            {option}
          </FilterPill>
        ))}
      </div>

      {(query.trim() || categoryFilter !== "All") && totalResults === 0 ? (
        <div className="empty">
          <h3>No results found</h3>
          <p>
            Try searching for a different title, character, event, or fandom
            keyword.
          </p>
        </div>
      ) : (
        <>
          {matchingResults.content.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-4 text-lg font-bold text-white">Content</h2>
              <div className="grid grid-3">
                {matchingResults.content.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {matchingResults.characters.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-lg font-bold text-white">Characters</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {matchingResults.characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            </section>
          )}

          {matchingResults.events.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-lg font-bold text-white">Events</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {matchingResults.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {matchingResults.merch.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-lg font-bold text-white">Merchandise</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {matchingResults.merch.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
