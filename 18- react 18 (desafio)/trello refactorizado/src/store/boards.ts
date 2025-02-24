/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createSelector } from "@reduxjs/toolkit";

export interface Board {
  id: number;
  name: string;
  userId: number;
  order: number[];
}

interface BoardsState {
  list: Board[];
  selectedId: number | null;
}

const initialState: BoardsState = {
  list: [{ id: 1, name: "tablero", userId: 1, order: [] }],
  selectedId: null, 
};

let lastId = 10;

const slice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    boardAdded: (boards, action) => {
      boards.list.push({
        id: ++lastId,
        name: action.payload.name,
        userId: action.payload.userId,
        order: [],
      });
      console.log('board added');
      
    },
    boardDeleted: (boards, action) => {
      const boardIndex = boards.list.findIndex(
        (board) => board.id === action.payload
      );

      boards.selectedId = null;
      boards.list.splice(boardIndex, 1);
      console.log('board deleted');
      
    },
    boardUpdatedOder: (boards, action) => {
      const { boardId, listId } = action.payload;
      const board = boards.list.find((board) => board.id === boardId);
      if (board) board.order.push(listId);
      console.log('board updated order');
      
    },
    boardSelected: (boards, action) => {
      boards.selectedId = action.payload;
      console.log('board selected');
      
    },
    boardUnselected: (boards, action) => {
      boards.selectedId = null;
      console.log('board unselected');

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
    {
      console.log('get board by user');
      
      return userId
        ? boards.list.filter((board) => board.userId === userId)
        : undefined
    }
  );

export const getBoardById = (boardId: number) =>
  createSelector(
    (state) => state.boards,
    (boards: BoardsState) => {
      console.log('get board by id');
      
      return boards.list.find((board) => board.id === boardId)
    }
  );

export const getOrderListByBoard = (boardId: number) =>
  createSelector(
    (state) => state.boards,
    (boards: BoardsState) => {
      console.log('get order list by board');
      
      const result = boards.list.find((board) => board.id === boardId);
      return result?.order;
    }
  );
