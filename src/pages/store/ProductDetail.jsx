import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { addToCart } = useCart();
  const product = { id:"demo", name:"Fandom Collectible", price:12000 };
  return <div className="container page"><div className="grid grid-2"><div className="media-placeholder" style={{minHeight:420}}>PRODUCT IMAGE</div><div><span className="eyebrow">Merchandise</span><h1>{product.name}</h1><h2>₦{product.price.toLocaleString()}</h2><p>Product information and fandom details.</p><button className="button primary" onClick={()=>addToCart(product)}>Add to Cart</button></div></div></div>;
}