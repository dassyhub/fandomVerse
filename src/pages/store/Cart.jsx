import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, total } = useCart();
  return <div className="container page"><span className="eyebrow">Store</span><h1>Your Cart</h1>{cart.length ? <><div className="grid">{cart.map((item,i)=><div className="card card-body" key={i}><div className="section-title"><strong>{item.name}</strong><span>₦{Number(item.price).toLocaleString()}</span></div><button className="button ghost" onClick={()=>removeFromCart(i)}>Remove</button></div>)}</div><div className="section"><h2>Total: ₦{total.toLocaleString()}</h2><p>Checkout and payment are not part of this project.</p></div></> : <div className="empty"><h3>Your cart is empty</h3><p>Add fandom merchandise to see your temporary cart total.</p></div>}</div>;
}