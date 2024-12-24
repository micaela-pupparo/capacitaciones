/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
  reducers: {
    screenChanged: (ui, action) => {
      ui.screen.width = window.innerWidth;
      ui.screen.height = window.innerHeight;
    },
  },
});

export const { screenChanged } = slice.actions;

export default slice.reducer;
