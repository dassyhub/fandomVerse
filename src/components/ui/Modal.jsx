export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "grid", placeItems: "center", background: "rgba(0,0,0,.7)", padding: 20 }}>
      <div className="card" style={{ width: "min(560px, 100%)", padding: 20 }}>
        <div className="section-title"><h3>{title}</h3><button className="icon-btn" onClick={onClose}>×</button></div>
        {children}
      </div>
    </div>
  );
}