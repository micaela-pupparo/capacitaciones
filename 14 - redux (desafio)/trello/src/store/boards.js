import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "boards",
  initialState: {
    list: [],
  },
  reducers: {
    boardAdded: (boards, action) => {
      boards.list.push({
        id: ++lastId,
        name: action.payload.name,
        userId: action.payload.userId,
        lists: [],
      });
    },
  },
});

export const { boardAdded } = slice.actions;

export default slice.reducer;
