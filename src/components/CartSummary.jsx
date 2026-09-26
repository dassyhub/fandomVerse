import { useCart } from "../context/CartContext";

export default function CartSummary() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty">
        <h3>Your cart is empty</h3>
        <p>Add fandom merchandise to see your cart total.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="card card-body flex flex-col md:flex-row md:items-center gap-4"
          >
            <div className="relative w-full md:w-24 h-24 md:h-24 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-violet-700/60 to-fuchsia-900/60">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[10px] text-violet-300">NO IMAGE</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white truncate">{item.name}</h4>
              <p className="text-xs text-[#a79bc0]">{item.franchise || item.details?.franchise}</p>
              <p className="text-sm font-bold text-white mt-1">
                ${Number(item.price).toFixed(2)} each
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="field" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="text-xs text-[#a79bc0]">Qty</span>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 text-center bg-[#171020] border border-[#30233d] text-white rounded-lg px-2 py-1.5 text-sm outline-none focus:border-[#9b5cff]"
                />
              </label>
              <button
                onClick={() => removeFromCart(item.id)}
                className="button ghost text-red-400 border-red-400/30 hover:bg-red-500/10"
                style={{ padding: "6px 10px", fontSize: "0.75rem" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="section border-t border-[#30233d] pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Total: ${total.toFixed(2)}</h2>
        </div>
        <p className="text-xs text-[#9b91a8] text-center">
          Checkout not included in this demo
        </p>
      </div>
    </div>
  );
}