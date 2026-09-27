import { useState } from "react";
import { Link } from "react-router-dom";

const flow = {
  start: {
    text: "Hi! I can help you discover fandoms, content, events and merchandise. What are you into?",
    options: ["Anime & Manga", "Gaming & Movies", "K-Pop & TV Shows", "Comics", "Events & Store"],
  },
  "Anime & Manga": {
    text: "Great choice! What would you like to know?",
    options: ["Trending anime", "Manga updates", "Character profiles", "Back"],
  },
  "Gaming & Movies": {
    text: "Nice! Pick a topic:",
    options: ["Gaming news", "Movie trailers", "Back"],
  },
  "K-Pop & TV Shows": {
    text: "Here's what I can help with:",
    options: ["K-Pop charts", "TV show highlights", "Back"],
  },
  Comics: {
    text: "Comics fan, love it. What do you need?",
    options: ["Comics spotlight", "Character profiles", "Back"],
  },
  "Events & Store": {
    text: "Let's find what you're looking for:",
    options: ["Upcoming events", "Find merchandise", "Bookmark content", "Back"],
  },
};

const answers = {
  "Trending anime": "Try Anime → Trending Now or explore Fan Pulse.",
  "Upcoming events": "Check the Events page for upcoming fandom events.",
  "Find merchandise": "The Store has fandom products and a temporary cart.",
  "Gaming news": "Head to Gaming → Featured Articles for the latest RPG and release news.",
  "Movie trailers": "Visit the Trailers page to browse trailers across every category.",
  "TV show highlights": "The TV Shows hub has episode highlights and trailer embeds.",
  "K-Pop charts": "Check K-Pop → Chart Highlights for the latest global rankings.",
  "Comics spotlight": "Explore Comics → Featured Issues for artist spotlights and fan art.",
  "Manga updates": "The Manga hub lists new chapters and reader favorites.",
  "Character profiles": "Every category page has a Characters section with bios and traits.",
  "Bookmark content": "Use the bookmark icon on any article, media, or event to save it for later.",
};

// keyword -> answer key, used to match free-typed text
const keywordMap = [
  { keywords: ["anime", "trending"], key: "Trending anime" },
  { keywords: ["manga"], key: "Manga updates" },
  { keywords: ["character", "profile", "bio"], key: "Character profiles" },
  { keywords: ["game", "gaming", "rpg"], key: "Gaming news" },
  { keywords: ["movie", "trailer"], key: "Movie trailers" },
  { keywords: ["tv", "show", "episode"], key: "TV show highlights" },
  { keywords: ["k-pop", "kpop", "k pop", "chart"], key: "K-Pop charts" },
  { keywords: ["comic"], key: "Comics spotlight" },
  { keywords: ["event", "convention", "meetup"], key: "Upcoming events" },
  { keywords: ["merch", "store", "shop", "buy", "cart"], key: "Find merchandise" },
  { keywords: ["bookmark", "save", "favorite"], key: "Bookmark content" },
];

const fallback = "I'm not sure about that yet — try asking about anime, gaming, movies, K-Pop, comics, manga, events, or merch.";

function findAnswerFromText(text) {
  const t = text.toLowerCase();
  const match = keywordMap.find((entry) => entry.keywords.some((k) => t.includes(k)));
  return match ? answers[match.key] : fallback;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("start");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");

  function handleOption(option) {
    if (option === "Back") {
      setStep("start");
      setMessage("");
      return;
    }
    if (flow[option]) {
      setStep(option);
      setMessage("");
    } else if (answers[option]) {
      setMessage(answers[option]);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setMessage(findAnswerFromText(query));
    setQuery("");
  }

  const current = flow[step];

  return (
    <div className="chatbot">
      {open && (
        <section className="chat-panel">
          <div className="section-title">
            <strong>FandomVerse Assistant</strong>
            <button className="icon-btn" onClick={() => setOpen(false)}>×</button>
          </div>
          <p>{current.text}</p>
          <div className="quick-replies">
            {current.options.map((o) => (
              <button key={o} onClick={() => handleOption(o)}>{o}</button>
            ))}
          </div>

          <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Or type your question..."
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.08)",
                color: "#f7f2ff",
                outline: "none",
              }}
            />
            <button type="submit" className="button ghost">Ask</button>
          </form>

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