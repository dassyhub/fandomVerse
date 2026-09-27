import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useBookmarks } from "../../context/BookmarkContext";
const cats = ["anime", "gaming", "movies", "tvshows", "kpop", "comics", "manga"];
export default function VideoDetail() {
  const { id } = useParams(); const [item, setItem] = useState(null); const { bookmarks, toggleBookmark } = useBookmarks();
  useEffect(() => { Promise.all(cats.map(c => fetch(`/data/${c}.json`).then(r => r.json()).catch(() => []))).then(all => setItem(all.flat().find(x => x.id === id && (x.type === "VIDEO" || x.type === "TRAILER")) || null)); }, [id]);
  if (!item) return <div className="container page"><div className="empty"><h3>Video not found</h3><Link to="/explore" className="button primary inline-block mt-4">Explore content</Link></div></div>;
  const saved = bookmarks.some(x => x.id === id);
  return <div className="container page"><Breadcrumbs items={[{ label: item.category, to: `/category/${item.category}` }, { label: item.title }]} /><span className="eyebrow">{item.type === "TRAILER" ? "Trailer" : "Video"}</span><h1 className="break-words">{item.title}</h1><p>{item.description}</p><div className="media-frame overflow-hidden rounded-2xl">{item.embedUrl ? <div className="relative aspect-video w-full"><iframe src={item.embedUrl} title={item.sourceTitle || item.title} className="absolute inset-0 h-full w-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div> : <video controls playsInline preload="metadata" poster={item.poster || item.thumbnail} className="detail-video"><source src={item.mediaSrc} type="video/mp4" />Your browser does not support video playback.</video>}</div><div className="section detail-actions"><button className="button primary" onClick={() => toggleBookmark({ ...item, kind: "media" })}>{saved ? "Bookmarked" : "Bookmark Video"}</button></div></div>;
}
