import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useBookmarks } from "../../context/BookmarkContext";
const categories = ["anime", "gaming", "movies", "tvshows", "kpop", "comics", "manga"];

export default function Gallery() {
  const { id } = useParams(); const [item, setItem] = useState(null); const [active, setActive] = useState(0); const { bookmarks, toggleBookmark } = useBookmarks();
  useEffect(() => { Promise.all(categories.map((category) => fetch(`/data/${category}.json`).then((r) => r.json()).catch(() => []))).then((all) => setItem(all.flat().find((entry) => entry.id === id && entry.type === "GALLERY") || null)); }, [id]);
  if (!item) return <div className="container page"><div className="empty"><h3>Gallery not found</h3><Link to="/explore" className="button primary inline-block mt-4">Explore content</Link></div></div>;
  const slides = item.galleryImages?.length ? item.galleryImages : [item.thumbnail]; const saved = bookmarks.some((entry) => entry.id === id);
  return <div className="container page"><Breadcrumbs items={[{ label: item.category, to: `/category/${item.category}` }, { label: item.title }]} /><span className="eyebrow">Gallery</span><h1>{item.title}</h1><p>{item.description}</p><img src={slides[active]} alt={`${item.title} image ${active + 1}`} className="gallery-main detail-cover" /><div className="gallery-thumbs">{slides.map((src, index) => <button key={src} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`}><img src={src} alt="" className="h-12 w-16 object-cover" /></button>)}</div><button className="button primary mt-4" onClick={() => toggleBookmark({ ...item, kind: "media" })}>{saved ? "Bookmarked" : "Bookmark Gallery"}</button></div>;
}
