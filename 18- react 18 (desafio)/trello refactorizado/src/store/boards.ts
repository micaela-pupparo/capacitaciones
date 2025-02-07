/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createSelector } from "@reduxjs/toolkit";

interface Board {
  id: number;
  name: string;
  userId: number;
  order: number[];
}

interface BoardsState {
  list: Board[];
  selectedId: number;
}

let lastId = 10;

const slice = createSlice({
  name: "boards",
  initialState: {
    list: [{ id: 1, name: "tablero", userId: 1, order: [] }] as Board[],
    selectedId: null,
  },
  reducers: {
    boardAdded: (boards, action) => {
      boards.list.push({
        id: ++lastId,
        name: action.payload.name,
        userId: action.payload.userId,
        order: [],
      });
    },
    boardDeleted: (boards, action) => {
      const boardIndex = boards.list.findIndex(
        (board) => board.id === action.payload
      );

      boards.selectedId = null;
      boards.list.splice(boardIndex, 1);
    },
    boardUpdatedOder: (boards, action) => {
      const { boardId, listId } = action.payload;
      const board = boards.list.find((board) => board.id === boardId);
      if (board) board.order.push(listId);
    },
    boardSelected: (boards, action) => {
      boards.selectedId = action.payload;
    },
    boardUnselected: (boards, action) => {
      boards.selectedId = null;
    },
  },
});

export const {
  boardAdded,
  boardSelected,
  boardUnselected,
  boardDeleted,
  boardUpdatedOder,
} = slice.actions;

export default slice.reducer;

export const getBoardsByUser = (userId: number) =>
  createSelector(
    (state) => state.boards,
    (boards: BoardsState) =>
      userId
        ? boards.list.filter((board) => board.userId === userId)
        : undefined
  );

export const getBoardById = (boardId: number) =>
  createSelector(
    (state) => state.boards,
    (boards: BoardsState) => boards.list.find((board) => board.id === boardId)
  );

export const getOrderListByBoard = (boardId: number) =>
  createSelector(
    (state) => state.boards,
    (boards: BoardsState) => {
      const result = boards.list.find((board) => board.id === boardId);
      return result?.order;
    }
  );
