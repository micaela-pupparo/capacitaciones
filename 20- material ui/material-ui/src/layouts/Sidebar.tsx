import { useEffect, useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { NavLink } from "react-router";
import ThemeSwitch from "../components/ThemeSwitch";

const components = [
  { label: "Ejemplo de Autocomplete", path: "/autocomplete" },
  { label: "Ejemplo de Button", path: "/button" },
  { label: "Ejemplo de Chip", path: "/chip" },
  { label: "Ejemplo de Alert", path: "/alert" },
  { label: "Ejemplo de Skeleton", path: "/skeleton" },
  { label: "Ejemplo de Card", path: "/card" },
  { label: "Ejemplo de Speed Dial", path: "/speeddial" },
];

const Sidebar = () => {
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    console.log(windowWidth);

    setWidth(windowWidth);
  }, []);

  const variant = width > 1140 ? "permanent" : "temporary";

  return (
    <>
      {variant === "temporary" && (
        <ArrowForwardIosIcon color="primary" onClick={() => setOpen(!open)} />
      )}
      <Drawer variant={variant} open={open} sx={{ width: "100%" }}>
        <List>
          {components.map((component, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                component={NavLink}
                to={component.path}
              >
                <ListItemText primary={component.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box>
          <ThemeSwitch />
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
