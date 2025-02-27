/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createSelector } from "@reduxjs/toolkit";

export interface List {
  id: number;
  name: string;
  boardId: number;
}

interface ListState {
  list: List[];
  selectedId: number | null;
}

const initialState: ListState = {
  list: [],
  selectedId: null, 
};

export let lastId = 10;

const slice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    listAdded: (lists, action) => {
      lists.list.push({
        id: action.payload.id ? action.payload.id : ++lastId,
        name: action.payload.name,
        boardId: action.payload.boardId,
      });
      if (action.payload.id) ++lastId;
      console.log('list added');
      
    },
    listDeleted: (lists, action) => {
      const listIndex = lists.list.findIndex(
        (board) => board.id === action.payload
      );

      lists.selectedId = null;
      lists.list.splice(listIndex, 1);
      console.log('list deleted');
      
    },
    listSelected: (lists, action) => {
      lists.selectedId = action.payload;
      console.log('list selected');
      
    },
    listUnselected: (lists, action) => {
      lists.selectedId = null;
      console.log('list unselected');
      
    },
  },
});

export const { listAdded, listDeleted, listSelected, listUnselected } =
  slice.actions;

export default slice.reducer;

export const getListIdByBoardId = (boardId: number) =>
  createSelector(
    (state) => state.lists,
    (lists: ListState) => {
      const result = lists.list
        .filter((list) => list.boardId === boardId)
        .map((list) => list.id);
      console.log('get list id by board id');
      
      return result ? result : [];
    }
  );

export const getAllListsByBoardId = (boardId: number) =>
  createSelector(
    (state) => state.lists,
    (lists: ListState) => {
      const result = lists.list.filter((list) => list.boardId === boardId);
      console.log('get all lists by board id');
      
      return result ? result : [];
    }
  );

export const getListById = (listId: number) =>
  createSelector(
    (state) => state.lists,
    (lists: ListState) => {
      const result = lists.list.find((list) => list.id === listId);
      console.log('get list by id');
      
      return result ? result : {} as List;
    }
  );
