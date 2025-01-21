import { createContext } from "react";

const ThemeContext = createContext({
  theme: "light",
  handleToggleTheme: () => {},
});

export default ThemeContext;
