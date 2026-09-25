export default function FanPulse() {
  const trends = ["Demon Slayer","Solo Leveling","Marvel","One Piece","Stranger Things","Honkai: Star Rail"];
  return <div className="container page"><span className="eyebrow">Fan Pulse</span><h1>What's hot right now?</h1><p>Trending fandoms, characters, media and merchandise across FandomVerse.</p><div className="grid grid-3 section">{trends.map((x,i)=><div className="card card-body" key={x}><span className="tag">{i<2?"RISING":"TRENDING"}</span><h2>{x}</h2><p>Popular with the FandomVerse community.</p></div>)}</div></div>;
}