import Breadcrumbs from "../../components/layout/Breadcrumbs";

export default function VideoDetail() {
  return <div className="container page"><Breadcrumbs items={[{label:"Videos",to:"/category/anime"},{label:"Video"}]} /><span className="eyebrow">Video / Trailer</span><h1>Featured Trailer</h1><div className="media-placeholder" style={{minHeight:420, marginTop:20}}>VIDEO PLAYER</div><div className="section"><p>Video description, release information, bookmark and related videos go here.</p></div></div>;
}