import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function useVisitorCount() {
  const [count, setCount] = useState(() => Number(localStorage.getItem("fandomverse-visitor-count") || 0));
  useEffect(() => {
    const key = "fandomverse-visit-session";
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      const next = Number(localStorage.getItem("fandomverse-visitor-count") || 0) + 1;
      localStorage.setItem("fandomverse-visitor-count", String(next));
      setCount(next);
    }
  }, []);
  return count;
}

export default function Footer() {
  const visitors = useVisitorCount();
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);

  return <footer className="border-t border-[var(--border)] bg-[var(--surface)] site-footer">
    <div className="mx-auto flex max-w-384 flex-col gap-4 px-4 py-8 text-sm text-[var(--muted)] sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-semibold text-[var(--text)]">FANDOMVERSE</span>
        <span className="text-xs sm:text-sm">Portal for the Fandom World · © 2026</span>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm"><Link to="/sitemap">Sitemap</Link><Link to="/contact">Contact Us</Link><Link to="/about">About Us</Link></div>
      </div>
      <div className="flex flex-wrap gap-4 border-t border-[var(--border)] pt-4 text-xs">
        <span>Visitors: <strong className="text-[var(--text)]">{visitors.toLocaleString()}</strong></span>
        <span>Local time: <strong className="text-[var(--text)]">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</strong></span>
        <span>Date: <strong className="text-[var(--text)]">{now.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" })}</strong></span>
      </div>
    </div>
  </footer>;
}
