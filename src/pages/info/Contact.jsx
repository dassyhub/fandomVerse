import { useState } from "react";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [locating, setLocating] = useState(false);

  const update = (field, value) => {
    setSent(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSent(true);
  };

  const locate = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({ lat: coords.latitude, lon: coords.longitude });
        setLocating(false);
      },
      (error) => {
        setLocating(false);
        setLocationError(
          error.code === 1
            ? "Location permission was denied. You can allow it in your browser settings and try again."
            : "We couldn't get your location. Please try again.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />
      <div className="grid grid-2 gap-8">
        <form className="form" onSubmit={submit} noValidate>
          <span className="eyebrow">Contact Us</span>
          <h1>Let's connect.</h1>
          <p>Have a suggestion, correction, or fandom idea? Use the demo contact form below.</p>

          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" autoComplete="name" required value={form.name} onChange={(event) => update("name", event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={(event) => update("email", event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6" required value={form.message} onChange={(event) => update("message", event.target.value)} />
          </div>
          <button className="button primary" type="submit">Send Message</button>
          {sent && <div className="success-message" role="status">Thanks! Your message has been captured locally for this demo. No server storage is used.</div>}
        </form>

        <section className="card card-body">
          <span className="eyebrow">Team Location</span>
          <h2>Find your position</h2>
          <p>FandomVerse does not continuously track location. Your browser only shares coordinates after you press the button and grant permission.</p>
          <button className="button ghost" onClick={locate} type="button" disabled={locating}>
            {locating ? "Getting location…" : "Use My Location"}
          </button>

          {location && (
            <div className="location-result" role="status">
              <strong>Location received</strong>
              <span>Latitude: {location.lat.toFixed(5)}</span>
              <span>Longitude: {location.lon.toFixed(5)}</span>
              <a href={`https://www.google.com/maps?q=${location.lat},${location.lon}`} target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
              <div className="media-frame mt-3">
                <iframe
                  title="Current location map"
                  src={`https://www.google.com/maps?q=${location.lat},${location.lon}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              </div>
            </div>
          )}

          {locationError && <p className="error-message" role="alert">{locationError}</p>}
          {!location && !locationError && <div className="media-placeholder map-placeholder rounded-xl border border-[var(--border)]">Map appears here after location permission</div>}
        </section>
      </div>
    </div>
  );
}
