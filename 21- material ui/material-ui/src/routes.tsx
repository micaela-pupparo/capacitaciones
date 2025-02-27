import { createBrowserRouter } from "react-router";
import App from "./App";
import Main from "./layouts/Main";
import AutocompleteExample from "./components/AutocompleteExample";
import ButtonExample from "./components/ButtonExample";
import ChipExample from "./components/ChipExample";
import AlertExample from "./components/AlertExample";
import SkeletonExample from "./components/SkeletonExample";
import CardExample from "./components/CardExample";
import SpeedDialExample from "./components/SpeedDialExample";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error 404 not found</h1>,
    children: [
      { index: true, element: <Main /> },
      { path: "/autocomplete", element: <AutocompleteExample /> },
      { path: "/button", element: <ButtonExample /> },
      { path: "/chip", element: <ChipExample /> },
      { path: "/alert", element: <AlertExample /> },
      { path: "/skeleton", element: <SkeletonExample /> },
      { path: "/card", element: <CardExample /> },
      { path: "/speeddial", element: <SpeedDialExample /> },
    ],
  },
]);

export default router;
