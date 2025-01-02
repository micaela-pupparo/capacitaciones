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
    boardDeleted: (boards, action) => {
      const boardIndex = boards.list.findIndex(
        (board) => board.id === action.payload
      );

      boards.selectedId = null;
      boards.list.splice(boardIndex, 1);
    },
    boardSelected: (boards, action) => {
      boards.selectedId = action.payload;
    },
    boardUnselected: (boards, action) => {
      boards.selectedId = null;
    },
  },
});

export const { boardAdded, boardSelected, boardUnselected, boardDeleted } =
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
