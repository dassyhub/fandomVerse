import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[#241a30] bg-[#0c0811]">
      <div className="mx-auto flex max-w-[1536px] flex-col gap-4 px-4 py-8 text-sm text-[#a79bc0] sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <span className="font-semibold text-white">FANDOMVERSE</span>
        <span className="text-xs sm:text-sm">Portal for the Fandom World · © 2026</span>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm">
          <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
          <Link to="/contact" className="hover:text-white">Contact Us</Link>
          <Link to="/about" className="hover:text-white">About Us</Link>
        </div>
      </div>
    </footer>
  );
}
