export default function MediaCard({ title = "Media Item", type = "VIDEO" }) {
  return (
    <article className="card">
      <div className="media-placeholder"><span className="tag">{type}</span></div>
      <div className="card-body"><h3>{title}</h3><p>Media placeholder for the shared content system.</p></div>
    </article>
  );
}