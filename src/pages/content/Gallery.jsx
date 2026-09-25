export default function Gallery() {
  return <div className="container page"><span className="eyebrow">Gallery</span><h1>Fandom Gallery</h1><div className="grid grid-4">{Array.from({length:8}, (_,i) => <div className="card" key={i}><div className="media-placeholder" style={{minHeight:190}}>IMAGE {i+1}</div></div>)}</div></div>;
}