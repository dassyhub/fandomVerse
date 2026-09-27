import { Routes, Route } from "react-router-dom";
import { BookmarkProvider } from "./context/BookmarkContext";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Chatbot from "./components/chatbot/Chatbot";
import Home from "./pages/Home";
import CategoryHub from "./pages/categories/CategoryHub";
import SearchResults from "./pages/search/SearchResults";
import ArticleDetail from "./pages/content/ArticleDetail";
import VideoDetail from "./pages/content/VideoDetail";
import AudioDetail from "./pages/content/AudioDetail";
import Gallery from "./pages/content/Gallery";
import Characters from "./pages/characters/Characters";
import CharacterProfile from "./pages/characters/CharacterProfile";
import Events from "./pages/events/Events";
import EventDetail from "./pages/events/EventDetail";
import Explore from "./pages/explore/Explore";
import ReleaseRadar from "./pages/releases/ReleaseRadar";
import Store from "./pages/store/Store";
import ProductDetail from "./pages/store/ProductDetail";
import Cart from "./pages/store/Cart";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import FandomMatch from "./pages/discovery/FandomMatch";
import FanPulse from "./pages/discovery/FanPulse";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import About from "./pages/info/About";
import Contact from "./pages/info/Contact";
import Sitemap from "./pages/Sitemap";
import IntroScreen from "./components/IntroScreen";
import { useEffect, useState } from "react";

export default function App() {
  const [intro, setIntro] = useState(() => sessionStorage.getItem("fandomverse-intro-seen") !== "1");
  useEffect(() => { if (!intro) sessionStorage.setItem("fandomverse-intro-seen", "1"); }, [intro]);
  if (intro) return <IntroScreen onComplete={() => { sessionStorage.setItem("fandomverse-intro-seen", "1"); setIntro(false); }} />;

  return (
    <ThemeProvider>
      <BookmarkProvider>
        <CartProvider>
          <div className="app-shell">
      <Navbar />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryHub />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/content/article/:id" element={<ArticleDetail />} />
          <Route path="/content/video/:id" element={<VideoDetail />} />
          <Route path="/content/audio/:id" element={<AudioDetail />} />
          <Route path="/content/gallery/:id" element={<Gallery />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterProfile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/releases" element={<ReleaseRadar />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/fandom-match" element={<FandomMatch />} />
          <Route path="/fan-pulse" element={<FanPulse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </main>
      <Chatbot />
      <Footer />
          </div>
        </CartProvider>
      </BookmarkProvider>
    </ThemeProvider>
  );
}