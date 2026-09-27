import { useEffect, useState } from "react";

export default function IntroScreen({ onComplete }) {
  const word = "FANDOMVERSE";
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(word.length);
      setLoading(true);
      const timer = setTimeout(onComplete, 650);
      return () => clearTimeout(timer);
    }
    const typing = setInterval(() => setVisible((v) => Math.min(v + 1, word.length)), 75);
    const loadTimer = setTimeout(() => setLoading(true), word.length * 75 + 120);
    const doneTimer = setTimeout(onComplete, word.length * 75 + 950);
    return () => { clearInterval(typing); clearTimeout(loadTimer); clearTimeout(doneTimer); };
  }, [onComplete]);

  return (
    <div className="intro-screen" role="status" aria-label="Loading FandomVerse">
      <div className="intro-orb intro-orb-one" />
      <div className="intro-orb intro-orb-two" />
      <div className="intro-content">
        <div className="intro-word" aria-label={word}>{word.slice(0, visible)}<span className="intro-cursor">|</span></div>
        <div className={`intro-loading ${loading ? "is-visible" : ""}`}>
          <span>Loading your fandom universe</span><i />
        </div>
      </div>
    </div>
  );
}
