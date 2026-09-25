export default function ReleaseRadar() {
  const items = ["New Anime Trailer", "Movie Release", "Fandom Expo", "New Merchandise Drop"];
  return <div className="container page"><span className="eyebrow">Release Radar</span><h1>Everything happening across fandom.</h1><p>Upcoming releases, trailers, events and new fandom content in one timeline.</p><div className="section grid grid-2">{items.map((x,i)=><div className="card card-body" key={x}><span className="tag">{i<2?"UPCOMING":"THIS WEEK"}</span><h2>{x}</h2><p>Release date and related fandom information.</p></div>)}</div></div>;
}