import { useState } from "react";
import { Link } from "react-router-dom";

const replies = {
  "Trending anime": "Try Anime → Trending Now or explore Fan Pulse.",
  "Upcoming events": "Check the Events page for upcoming fandom events.",
  "Find merchandise": "The Store has fandom products and a temporary cart.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="chatbot">
      {open && (
        <section className="chat-panel">
          <div className="section-title"><strong>FandomVerse Assistant</strong><button className="icon-btn" onClick={() => setOpen(false)}>×</button></div>
          <p>Hi! I can help you discover fandoms, content, events and merchandise.</p>
          <div className="quick-replies">
            {Object.keys(replies).map((q) => <button key={q} onClick={() => setMessage(replies[q])}>{q}</button>)}
          </div>
          {message && <p style={{ marginTop: 14, color: "#f7f2ff" }}>{message}</p>}
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <Link className="button ghost" to="/fandom-match">Fandom Match</Link>
            <Link className="button ghost" to="/fan-pulse">Fan Pulse</Link>
          </div>
        </section>
      )}
      <button className="chat-toggle" aria-label="Open chatbot" onClick={() => setOpen((v) => !v)}>💬</button>
    </div>
  );
}