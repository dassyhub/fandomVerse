import { createContext, useContext, useEffect, useState } from "react";

const BookmarkContext = createContext(null);

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem("fandomverse-bookmarks") || "[]"));
  useEffect(() => localStorage.setItem("fandomverse-bookmarks", JSON.stringify(bookmarks)), [bookmarks]);

  const toggleBookmark = (item) => {
    setBookmarks((current) =>
      current.some((x) => x.id === item.id)
        ? current.filter((x) => x.id !== item.id)
        : [...current, item]
    );
  };

  return <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>{children}</BookmarkContext.Provider>;
}

export const useBookmarks = () => useContext(BookmarkContext);