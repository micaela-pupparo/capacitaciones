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
    listDeleted: (lists, action) => {
      const listIndex = lists.list.findIndex(
        (board) => board.id === action.payload
      );

      lists.selectedId = null;
      lists.list.splice(listIndex, 1);
    },
    listSelected: (lists, action) => {
      lists.selectedId = action.payload;
    },
    listUnselected: (lists, action) => {
      lists.selectedId = null;
    },
  },
});

export const { listAdded, listDeleted, listSelected, listUnselected } =
  slice.actions;

export default slice.reducer;

export const getListIdByBoardId = (boardId) =>
  createSelector(
    (state) => state.lists,
    (lists) => {
      const result = lists.list
        .filter((list) => list.boardId === boardId)
        .map((list) => list.id);
      return result ? result : [];
    }
  );

export const getListById = (listId) =>
  createSelector(
    (state) => state.lists,
    (lists) => {
      const result = lists.list.find((list) => list.id === listId);
      return result ? result : [];
    }
  );
