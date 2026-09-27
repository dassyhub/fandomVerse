import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useBookmarks } from "../../context/BookmarkContext";

const cats = ["anime", "gaming", "movies", "tvshows", "kpop", "comics", "manga"];

export default function ArticleDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { bookmarks, toggleBookmark } = useBookmarks();
  useEffect(() => { Promise.all(cats.map(c => fetch(`/data/${c}.json`).then(r => r.json()).catch(() => []))).then(all => setItem(all.flat().find(x => x.id === id && x.type === "ARTICLE") || null)); }, [id]);
  if (!item) return <div className="container page"><div className="empty"><h3>Article not found</h3><Link to="/explore" className="button primary inline-block mt-4">Explore content</Link></div></div>;
  const saved = bookmarks.some(x => x.id === id);
  return <div className="container page">
    <Breadcrumbs items={[{ label: item.category, to: `/category/${item.category}` }, { label: item.title }]} />
    <article className="detail-page">
      <span className="eyebrow">Article · {item.category}</span><h1 className="break-words">{item.title}</h1><p>{item.meta || "Featured article"}</p>
      <img src={item.thumbnail} alt="" className="detail-cover" />
      <div className="detail-actions"><button className="button primary" onClick={() => toggleBookmark({ ...item, kind: "articles" })}>{saved ? "Bookmarked" : "Bookmark Article"}</button></div>
      <div className="article-body">{(item.body || [item.description]).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
    </article>
  </div>;
}
