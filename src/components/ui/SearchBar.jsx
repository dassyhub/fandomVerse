export default function SearchBar({ value, onChange, onSubmit, placeholder = "Search FandomVerse..." }) {
  return <form onSubmit={(e)=>{e.preventDefault();onSubmit?.();}} className="w-full"><input className="search-mini" style={{width:"100%",maxWidth:640}} value={value} onChange={onChange} placeholder={placeholder} aria-label="Search FandomVerse" /></form>;
}
