import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useBookmarks } from "../../context/BookmarkContext";
const cats = ["anime", "gaming", "movies", "tvshows", "kpop", "comics", "manga"];
export default function AudioDetail() {
  const { id } = useParams(); const [item, setItem] = useState(null); const { bookmarks, toggleBookmark } = useBookmarks();
  useEffect(() => { Promise.all(cats.map(c => fetch(`/data/${c}.json`).then(r => r.json()).catch(() => []))).then(all => setItem(all.flat().find(x => x.id === id && x.type === "AUDIO") || null)); }, [id]);
  if (!item) return <div className="container page"><div className="empty"><h3>Audio not found</h3><Link to="/explore" className="button primary inline-block mt-4">Explore content</Link></div></div>;
  const saved = bookmarks.some(x => x.id === id);
  return <div className="container page"><Breadcrumbs items={[{ label: item.category, to: `/category/${item.category}` }, { label: item.title }]} /><span className="eyebrow">Audio</span><h1 className="break-words">{item.title}</h1><p>{item.description}</p><div className="card audio-card"><img src={item.cover} alt="" className="audio-cover" /><div className="audio-player"><audio controls preload="metadata" src={item.mediaSrc}>Your browser does not support audio playback.</audio></div><button className="button primary" onClick={() => toggleBookmark({ ...item, kind: "media" })}>{saved ? "Bookmarked" : "Bookmark Audio"}</button></div></div>;
}
