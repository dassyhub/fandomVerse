import { Link } from "react-router-dom";
import Breadcrumbs from "../components/layout/Breadcrumbs";

const groups = [
  { title: "Explore", links: [["Home", "/"], ["Explore", "/explore"], ["Search", "/search"], ["Characters", "/characters"], ["Events", "/events"], ["Release Radar", "/releases"], ["Trailers", "/trailers"]] },
  { title: "Fandoms", links: [["Anime", "/category/anime"], ["Gaming", "/category/gaming"], ["Movies", "/category/movies"], ["TV Shows", "/category/tvshows"], ["K-Pop", "/category/kpop"], ["Comics", "/category/comics"], ["Manga", "/category/manga"]] },
  { title: "Community", links: [["Fandom Match", "/fandom-match"], ["Fan Pulse", "/fan-pulse"], ["Bookmarks", "/bookmarks"], ["About Us", "/about"], ["Contact Us", "/contact"]] },
  { title: "Store", links: [["Store", "/store"], ["Cart", "/cart"]] },
];

export default function Sitemap() {
  return <div className="container page"><Breadcrumbs items={[{ label: "Sitemap" }]} /><span className="eyebrow">Navigate</span><h1>FandomVerse Sitemap</h1><p>Everything in one place so you can jump around the fandom universe.</p><div className="section grid grid-3">{groups.map((group) => <section className="card card-body" key={group.title}><h2>{group.title}</h2><div className="sitemap-links">{group.links.map(([label, to]) => <Link key={to} to={to}>{label} <span>→</span></Link>)}</div></section>)}</div></div>;
}
