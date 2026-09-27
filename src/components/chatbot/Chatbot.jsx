import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

const flow = {
  start: {
    text: "Hi! I can help you discover fandoms, content, events and merchandise. What are you into?",
    options: [
      "Anime & Manga",
      "Gaming & Movies",
      "K-Pop & TV Shows",
      "Comics",
      "Events & Store",
    ],
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
    text: "Here's what I can help you with:",
    options: ["K-Pop charts", "TV show highlights", "Back"],
  },
  Comics: {
    text: "Comics fan, love it. What do you need?",
    options: ["Comics spotlight", "Character profiles", "Back"],
  },
  "Events & Store": {
    text: "Let's find what you're looking for:",
    options: [
      "Upcoming events",
      "Find merchandise",
      "Bookmark content",
      "Back",
    ],
  },
};

const answers = {
  "Trending anime": "Try Anime → Trending Now or explore Fan Pulse.",
  "Upcoming events": "Check the Events page for upcoming fandom events.",
  "Find merchandise": "The Store has fandom products and a temporary cart.",
  "Gaming news":
    "Head to Gaming → Featured Articles for the latest RPG and release news.",
  "Movie trailers":
    "Visit the Trailers page to browse trailers across every category.",
  "TV show highlights":
    "The TV Shows hub has episode highlights and trailer embeds.",
  "K-Pop charts":
    "Check K-Pop → Chart Highlights for the latest global rankings.",
  "Comics spotlight":
    "Explore Comics → Featured Issues for artist spotlights and fan art.",
  "Manga updates":
    "The Manga hub lists new chapters and reader favorites.",
  "Character profiles":
    "Every category page has a Characters section with bios and traits.",
  "Bookmark content":
    "Use the bookmark icon on any article, media, or event to save it for later.",
};

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
  {
    keywords: ["merch", "store", "shop", "buy", "cart"],
    key: "Find merchandise",
  },
  {
    keywords: ["bookmark", "save", "favorite"],
    key: "Bookmark content",
  },
];

const fallback =
  "I'm not sure about that yet — try asking about anime, gaming, movies, K-Pop, comics, manga, events, or merch.";

function findAnswerFromText(text) {
  const query = text.toLowerCase();

  const match = keywordMap.find((entry) =>
    entry.keywords.some((keyword) => query.includes(keyword))
  );

  return match ? answers[match.key] : fallback;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("start");
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");

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

  function send(event) {
    event.preventDefault();

    const value = input.trim();

    if (!value) return;

    setMessage(findAnswerFromText(value));
    setInput("");
  }

  const current = flow[step];

  return (
    <div className="chatbot">
      {open && (
        <section className="chat-panel" aria-label="FandomVerse Assistant">
          <div className="section-title">
            <div>
              <span className="eyebrow">Site assistant</span>
              <strong>FandomVerse Assistant</strong>
            </div>

            <button
              className="icon-btn"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
              type="button"
            >
              <FiX />
            </button>
          </div>

          <p>{current.text}</p>

          <div className="quick-replies" aria-label="Suggested questions">
            {current.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOption(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <form className="chat-input" onSubmit={send}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question…"
              aria-label="Ask the chatbot"
            />

            <button
              className="button primary"
              type="submit"
              aria-label="Send question"
            >
              <FiSend size={14} />
            </button>
          </form>

          {message && (
            <p className="chat-response" role="status">
              {message}
            </p>
          )}

          <div className="chat-links">
            <Link
              className="button ghost"
              to="/fandom-match"
              onClick={() => setOpen(false)}
            >
              Fandom Match
            </Link>

            <Link
              className="button ghost"
              to="/fan-pulse"
              onClick={() => setOpen(false)}
            >
              Fan Pulse
            </Link>
          </div>
        </section>
      )}

      <button
        className="chat-toggle"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </button>
    </div>
  );
}