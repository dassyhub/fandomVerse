import CartSummary from "../../components/CartSummary";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

export default function Cart() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Store", to: "/store" }, { label: "Cart" }]} />
      <span className="eyebrow">Store</span>
      <h1>Your Cart</h1>
      <CartSummary />
    </div>
  );
}