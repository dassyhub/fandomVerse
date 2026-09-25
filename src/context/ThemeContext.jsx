import { createContext, useContext } from "react";

const ThemeContext = createContext({ theme: "dark" });
export const ThemeProvider = ({ children }) => <ThemeContext.Provider value={{ theme: "dark" }}>{children}</ThemeContext.Provider>;
export const useTheme = () => useContext(ThemeContext);