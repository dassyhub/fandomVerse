import { useState } from "react";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  const submit = (e) => { e.preventDefault(); if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return; setSent(true); };
  const locate = () => {
    setLocationError("");
    if (!navigator.geolocation) { setLocationError("Geolocation is not supported by this browser."); return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setLocation({ lat: coords.latitude, lon: coords.longitude }),
      (err) => setLocationError(err.code === 1 ? "Location permission was denied." : "We couldn't get your location. Please try again."),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  return <div className="container page"><Breadcrumbs items={[{ label: "Contact Us" }]} /><div className="grid grid-2 gap-8">
    <form className="form" onSubmit={submit} noValidate><span className="eyebrow">Contact Us</span><h1>Let's connect.</h1><p>Have a suggestion, correction or fandom idea? Send it to the team.</p>
      <div className="field"><label htmlFor="name">Name</label><input id="name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
      <div className="field"><label htmlFor="message">Message</label><textarea id="message" rows="6" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
      <button className="button primary" type="submit">Send Message</button>
      {sent && <div className="success-message" role="status">Thanks! Your message has been captured for this demo.</div>}
    </form>
    <section className="card card-body"><h2>Location / Map</h2><p>Use your browser's location permission to share your current coordinates.</p><button className="button ghost" onClick={locate} type="button">Use My Location</button>{location && <div className="location-result"><strong>Location received</strong><span>Latitude: {location.lat.toFixed(5)}</span><span>Longitude: {location.lon.toFixed(5)}</span><a href={`https://www.google.com/maps?q=${location.lat},${location.lon}`} target="_blank" rel="noreferrer">Open in Google Maps ↗</a></div>}{locationError && <p className="error-message">{locationError}</p>}<div className="media-placeholder map-placeholder">FANDOMVERSE LOCATION MAP</div></section>
  </div></div>;
}
