import { createSlice, createSelector, current } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "boards",
  initialState: {
    list: [],
    selectedId: null,
  },
  reducers: {
    boardAdded: (boards, action) => {
      boards.list.push({
        id: ++lastId,
        name: action.payload.name,
        userId: action.payload.userId,
      });
    },
    boardSelected: (boards, action) => {
      boards.selectedId = action.payload;
    },
    boardUnselected: (boards, action) => {
      boards.selectedId = null;
    },
  },
});

export const { boardAdded, boardSelected, boardUnselected, listAdded } =
  slice.actions;

export default slice.reducer;

export const getBoardsByUser = (userId) =>
  createSelector(
    (state) => state.boards,
    (boards) =>
      userId
        ? boards.list.filter((board) => board.userId === userId)
        : undefined
  );

export const getBoardById = (boardId) =>
  createSelector(
    (state) => state.boards,
    (boards) => boards.list.find((board) => board.id === boardId)
  );
