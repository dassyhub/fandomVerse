import ProductCard from "../../components/cards/ProductCard";

export default function Store() {
  return <div className="container page"><span className="eyebrow">Merchandise</span><h1>Curated fandom finds.</h1><div className="filters"><button className="button primary">All</button><button className="button ghost">Apparel</button><button className="button ghost">Accessories</button><button className="button ghost">Collectibles</button></div><div className="grid grid-4">{[1,2,3,4].map(i=><ProductCard key={i} product={{id:i,name:`Fandom Product ${i}`,price:8500*i,franchise:"Featured Fandom"}}/>)}</div></div>;
}