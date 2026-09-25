import { useState } from "react";

export default function FandomMatch() {
  const [selected, setSelected] = useState([]);
  const interests = ["Anime","Gaming","Movies","TV Shows","K-Pop","Comics","Manga"];
  return <div className="container page"><span className="eyebrow">Fandom Match</span><h1>Find your next obsession.</h1><p>Pick your interests and we'll create a lightweight recommendation experience.</p><div className="filters">{interests.map(x=><button key={x} className={`button ${selected.includes(x)?"primary":"ghost"}`} onClick={()=>setSelected(s=>s.includes(x)?s.filter(i=>i!==x):[...s,x])}>{x}</button>)}</div>{selected.length>0 && <div className="section"><h2>Your matches</h2><div className="grid grid-3">{selected.slice(0,3).map((x,i)=><div className="card card-body" key={x}><span className="tag">{94-i*5}% MATCH</span><h2>{x}</h2><p>Recommended based on your selected interests.</p></div>)}</div></div>}</div>;
}