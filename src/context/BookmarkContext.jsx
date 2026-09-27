import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fandomverse-bookmarks";
const NOTES_KEY = "fandomverse-bookmark-notes";
const BookmarkContext = createContext(null);

function readJson(storage, key, fallback) {
  try {
    return JSON.parse(storage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function readBookmarks() {
  const stored = readJson(localStorage, STORAGE_KEY, []);
  const notes = readJson(sessionStorage, NOTES_KEY, {});
  return stored.map((item) => ({ ...item, note: notes[item.id] || "" }));
}

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(readBookmarks);

  useEffect(() => {
    const withoutSessionNotes = bookmarks.map(({ note, ...item }) => item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withoutSessionNotes));

    const notes = Object.fromEntries(
      bookmarks.filter((item) => item.note?.trim()).map((item) => [item.id, item.note]),
    );
    sessionStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [bookmarks]);

  const toggleBookmark = (item) => {
    if (!item?.id) return;

    setBookmarks((current) => {
      const exists = current.some((entry) => entry.id === item.id);
      if (exists) return current.filter((entry) => entry.id !== item.id);
      return [
        ...current,
        {
          ...item,
          kind: item.kind || item.type?.toLowerCase() || "content",
          note: "",
        },
      ];
    });
  };

  const updateNote = (id, note) => {
    setBookmarks((current) => current.map((item) => (item.id === id ? { ...item, note } : item)));
  };

  const removeBookmark = (id) => setBookmarks((current) => current.filter((item) => item.id !== id));
  const clearBookmarks = () => setBookmarks([]);

  const exportBookmarks = () => {
    const blob = new Blob([JSON.stringify(bookmarks, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fandomverse-bookmarks.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const value = useMemo(
    () => ({ bookmarks, toggleBookmark, updateNote, removeBookmark, clearBookmarks, exportBookmarks }),
    [bookmarks],
  );

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}

export const useBookmarks = () => useContext(BookmarkContext);
