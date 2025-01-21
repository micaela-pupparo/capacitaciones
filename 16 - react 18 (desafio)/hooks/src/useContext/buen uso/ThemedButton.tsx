import { useContext } from "react";
import ThemeContext from "./themeContext";

const ThemedButton = () => {
  const { theme, handleToggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={handleToggleTheme}
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      Cambiar a {theme === "light" ? "oscuro" : "claro"}
    </button>
  );
};

export default ThemedButton;
