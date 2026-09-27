import { useEffect, useMemo, useState } from "react";
import EventCard from "../../components/cards/EventCard";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
export default function Events() {
  const [events,setEvents]=useState([]); const [filter,setFilter]=useState("All");
  useEffect(()=>{fetch("/data/events.json").then(r=>r.json()).then(setEvents).catch(()=>setEvents([]));},[]);
  const visible=useMemo(()=>events.filter(e=>filter==="All"||e.category===filter),[events,filter]);
  return <div className="container page"><Breadcrumbs items={[{label:"Events"}]} /><span className="eyebrow">Events</span><h1>What's happening in the fandom?</h1><p>Discover the events in the FandomVerse calendar.</p><div className="filters"><button className={`button ${filter==="All"?"primary":"ghost"}`} onClick={()=>setFilter("All")}>All</button>{["anime","gaming","movies","tvshows","kpop","comics","manga"].map(c=><button key={c} className={`button ${filter===c?"primary":"ghost"}`} onClick={()=>setFilter(c)}>{c==="tvshows"?"TV Shows":c.toUpperCase()}</button>)}</div>{visible.length?<div className="grid grid-3">{visible.map(e=><EventCard event={e} key={e.id}/>)}</div>:<div className="empty">No events found.</div>}</div>;
}
