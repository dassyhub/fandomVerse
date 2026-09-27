import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useBookmarks } from "../../context/BookmarkContext";
import { imageForCategory } from "../../constants/categoryAssets";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { bookmarks, toggleBookmark } = useBookmarks();
  useEffect(() => { fetch("/data/events.json").then((r) => r.json()).then((data) => setEvent(data.find((entry) => entry.id === id) || null)); }, [id]);
  if (!event) return <div className="container page"><div className="empty"><h3>Event not found</h3><Link to="/events" className="button primary inline-block mt-4">Back to Events</Link></div></div>;
  const saved = bookmarks.some((entry) => entry.id === id);
  return <div className="container page"><Breadcrumbs items={[{ label: "Events", to: "/events" }, { label: event.title }]} /><span className="eyebrow">{event.category} event</span><h1>{event.title}</h1><p>{event.date} · {event.location}</p><img src={event.image || imageForCategory(event.category)} alt={event.title} className="detail-cover" /><section className="section"><h2>About this event</h2><p>{event.description}</p><button className="button primary" onClick={() => toggleBookmark({ ...event, kind: "events" })}>{saved ? "Bookmarked" : "Bookmark Event"}</button></section></div>;
}
