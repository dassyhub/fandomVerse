import CharacterCard from "../../components/cards/CharacterCard";

export default function Characters() {
  const chars = [
    {id:"tanjiro",name:"Tanjiro Kamado",series:"Demon Slayer"},
    {id:"character-2",name:"Character Two",series:"Featured Series"},
    {id:"character-3",name:"Character Three",series:"Featured Series"},
  ];
  return <div className="container page"><span className="eyebrow">Characters</span><h1>Meet the characters.</h1><div className="filters"><button className="button primary">Newest</button><button className="button ghost">A-Z</button><button className="button ghost">Popular</button></div><div className="grid grid-3">{chars.map(c => <CharacterCard character={c} key={c.id}/>)}</div></div>;
}