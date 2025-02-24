/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createSelector } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  name: string;
  listId: number;
}

interface TasksState {
  list: Task[];
  selectedId: number | null;
}

const initialState: TasksState = {
  list: [],
  selectedId: null, 
};

let lastId = 10;

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAdded: (tasks, action) => {
      tasks.list.push({
        id: ++lastId,
        name: action.payload.name,
        listId: action.payload.listId,
      });
      console.log('task added');
      
    },
    taskSelected: (tasks, action) => {
      tasks.selectedId = action.payload;
      console.log('task selected');
      
    },
    taskUnselected: (tasks, action) => {
      tasks.selectedId = null;
      console.log('task unselected');
      
    },
  },
});

export const { taskAdded, taskSelected, taskUnselected } = slice.actions;

export default slice.reducer;

export const getTasksByList = (listId: number) =>
  createSelector(
    (state) => state.tasks,
    (tasks: TasksState) => { 
      console.log('tasks selector');
      
      return listId ? tasks.list.filter((task) => task.listId === listId) : undefined
    }
  );
