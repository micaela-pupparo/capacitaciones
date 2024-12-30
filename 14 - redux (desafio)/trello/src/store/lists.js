import { createSlice, createSelector } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "lists",
  initialState: {
    list: [],
    selectedId: null,
  },
  reducers: {
    listAdded: (lists, action) => {
      lists.list.push({
        id: ++lastId,
        name: action.payload.name,
        boardId: action.payload.boardId,
      });
    },
    listSelected: (lists, action) => {
      lists.selectedId = action.payload;
    },
    listUnselected: (lists, action) => {
      lists.selectedId = null;
    },
  },
});

export const { listAdded, listSelected, listUnselected } = slice.actions;

export default slice.reducer;

export const getListsByBoard = (boardId) =>
  createSelector(
    (state) => state.lists,
    (lists) => {
      const result = boardId
        ? lists.list.filter((list) => list.boardId === boardId)
        : undefined;
      console.log(result);
      return result;
    }
  );
