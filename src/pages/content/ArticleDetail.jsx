import Breadcrumbs from "../../components/layout/Breadcrumbs";

export default function ArticleDetail() {
  return <div className="container page"><Breadcrumbs items={[{label:"Anime",to:"/category/anime"},{label:"Article"}]} /><div className="page-header"><span className="eyebrow">Article</span><h1>The Rise of a New Generation</h1><p>May 22, 2026 · Featured</p></div><div className="media-placeholder" style={{minHeight:320}}>ARTICLE HERO MEDIA</div><section className="section"><p>Article content placeholder. Replace this with the team's curated, original or appropriately licensed fandom content.</p><p>Build the detail view with related content, bookmark and share actions.</p></section></div>;
}