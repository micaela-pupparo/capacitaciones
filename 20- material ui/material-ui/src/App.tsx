import { createTheme, CssBaseline, Grid2, ThemeProvider, useColorScheme } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "./layouts/Sidebar";

function App() {
  const { mode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <>
        <CssBaseline enableColorScheme />
        {/* <Button onClick={() => setDarkMode(!darkMode)} variant="contained">Cambiar a {darkMode ? 'Claro' : 'Oscuro'}</Button> */}
        
        <Grid2 container>
          <Grid2 size={2}>
            <Sidebar />
          </Grid2>
          <Grid2 size="grow">
            <Outlet />
          </Grid2>
        </Grid2>
    </>
  );
}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function ToggleColorMode() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}