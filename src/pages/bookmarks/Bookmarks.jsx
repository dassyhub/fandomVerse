import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useBookmarks } from "../../context/BookmarkContext";

const FILTERS = [
  "All",
  "Articles",
  "Characters",
  "Events",
  "Media",
  "Merchandise",
];
function kindOf(item) {
  if (item.kind) return item.kind;
  if (item.type) return item.type === "ARTICLE" ? "articles" : "media";
  if (item.series) return "characters";
  if (item.date) return "events";
  if (item.name) return "merchandise";
  return "media";
}
function routeFor(item) {
  const kind = kindOf(item);
  if (kind === "characters") return `/characters/${item.id}`;
  if (kind === "events") return `/events/${item.id}`;
  if (kind === "merchandise") return `/store/${item.id}`;
  const type =
    item.type === "TRAILER" ? "video" : (item.type || "article").toLowerCase();
  return `/content/${type}/${item.id}`;
}

export default function Bookmarks() {
  const {
    bookmarks,
    removeBookmark,
    updateNote,
    exportBookmarks,
    clearBookmarks,
  } = useBookmarks();
  const [filter, setFilter] = useState("All");
  const visible = useMemo(
    () =>
      bookmarks.filter(
        (item) => filter === "All" || kindOf(item) === filter.toLowerCase(),
      ),
    [bookmarks, filter],
  );

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Bookmarks" }]} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">My Collection</span>
          <h1>Bookmarks</h1>
          <p>Save the fandom moments you want to come back to.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="button ghost"
            onClick={exportBookmarks}
            disabled={!bookmarks.length}
          >
            Export
          </button>
          <button
            className="button ghost"
            onClick={clearBookmarks}
            disabled={!bookmarks.length}
          >
            Clear all
          </button>
        </div>
      </div>
      <div className="filters" role="group" aria-label="Bookmark filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`button ${filter === f ? "primary" : "ghost"}`}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>
      {!visible.length ? (
        <div className="empty">
          <h3>
            {bookmarks.length ? "Nothing in this filter" : "No bookmarks yet"}
          </h3>
          <p>
            {bookmarks.length
              ? "Try another category."
              : "Save characters, articles, events and media as you explore FandomVerse."}
          </p>
          <Link className="button primary inline-block mt-4" to="/explore">
            Explore FandomVerse
          </Link>
        </div>
      ) : (
        <div className="bookmark-grid">
          {visible.map((item) => (
            <article className="card bookmark-card" key={item.id}>
              <div className="bookmark-thumb">
                {item.image || item.thumbnail || item.cover ? (
                  <img
                    src={item.image || item.thumbnail || item.cover}
                    alt={item.title || item.name || "Bookmarked content"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span>{(item.type || kindOf(item)).toUpperCase()}</span>
                )}
              </div>
              <div className="card-body">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3>{item.title || item.name}</h3>
                    <p className="text-xs">
                      {item.series ||
                        item.category ||
                        item.meta ||
                        "Saved item"}
                    </p>
                  </div>
                  <button
                    className="text-xs text-[#ff78b8]"
                    onClick={() => removeBookmark(item.id)}
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  aria-label={`Note for ${item.title || item.name}`}
                  value={item.note || ""}
                  onChange={(e) => updateNote(item.id, e.target.value)}
                  placeholder="Add a private session note…"
                  rows="2"
                />
                <div className="mt-3">
                  <Link className="button ghost text-xs" to={routeFor(item)}>
                    Open
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
