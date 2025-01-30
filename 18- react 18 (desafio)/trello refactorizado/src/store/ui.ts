/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    navbar: {
      class: "navbar--white",
    },
  },
  reducers: {
    screenChanged: (ui, action) => {
      ui.screen.width = window.innerWidth;
      ui.screen.height = window.innerHeight;
    },
    navbarClassChanged: (ui, action) => {
      ui.navbar.class = action.payload.class;
    },
  },
});

export const { screenChanged, navbarClassChanged } = slice.actions;

export default slice.reducer;
