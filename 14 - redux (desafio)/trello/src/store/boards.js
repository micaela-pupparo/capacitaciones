import { createSlice, createSelector } from "@reduxjs/toolkit";

let lastId = 0;
let lastListId = 0;

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
        lists: ["hola"],
      });
    },
    boardSelected: (boards, action) => {
      boards.selectedId = action.payload;
    },
    boardUnselected: (boards, action) => {
      boards.selectedId = null;
    },
    listAdded: (boards, action) => {
      const board = getBoardById(boards.selectedId);
      console.log(board);
      board.lists.push({
        id: ++lastListId,
        name: action.payload.name,
        tasks: [],
      });
    },
  },
});

export const { boardAdded, boardSelected, boardUnselected } = slice.actions;

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

export const getListsByBoardId = createSelector(
  (state) => state.boards,
  (boards) => {
    const result = boards.list.filter(
      (board) => board.id === boards.selectedId
    );
    return result[0].lists;
  }
);
