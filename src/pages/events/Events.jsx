import EventCard from "../../components/cards/EventCard";

export default function Events() {
  return <div className="container page"><span className="eyebrow">Events</span><h1>What's happening in the fandom?</h1><div className="filters"><button className="button primary">Upcoming</button><button className="button ghost">Past</button><button className="button ghost">All Categories</button></div><div className="grid grid-3">{[1,2,3].map(i => <EventCard key={i} event={{id:i,title:`Fandom Event ${i}`,date:"July 2026",location:"Global"}}/>)}</div></div>;
}