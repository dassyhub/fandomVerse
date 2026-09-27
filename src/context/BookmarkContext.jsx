import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "fandomverse-bookmarks";
const BookmarkContext = createContext(null);

function readBookmarks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(readBookmarks);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks)), [bookmarks]);

  const toggleBookmark = (item) => {
    if (!item?.id) return;
    setBookmarks((current) => current.some((x) => x.id === item.id)
      ? current.filter((x) => x.id !== item.id)
      : [...current, { ...item, kind: item.kind || item.type?.toLowerCase() || "content", note: item.note || "" }]);
  };

  const updateNote = (id, note) => setBookmarks((current) => current.map((item) => item.id === id ? { ...item, note } : item));
  const removeBookmark = (id) => setBookmarks((current) => current.filter((item) => item.id !== id));
  const clearBookmarks = () => setBookmarks([]);

  const exportBookmarks = () => {
    const blob = new Blob([JSON.stringify(bookmarks, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fandomverse-bookmarks.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, updateNote, removeBookmark, clearBookmarks, exportBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);
