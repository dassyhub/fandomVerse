export default function SearchBar({ value, onChange, placeholder = "Search FandomVerse..." }) {
  return <input className="search-mini" style={{ width: "100%", maxWidth: 640 }} value={value} onChange={onChange} placeholder={placeholder} />;
}