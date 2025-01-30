/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createSelector } from "@reduxjs/toolkit";

interface Task {
  id: number;
  name: string;
  listId: number;
}

interface TasksState {
  list: Task[];
  selectedId: number | null;
}

let lastId = 0;

const slice = createSlice({
  name: "tasks",
  initialState: {
    list: [] as Task[],
    selectedId: null,
  },
  reducers: {
    taskAdded: (tasks, action) => {
      tasks.list.push({
        id: ++lastId,
        name: action.payload.name,
        listId: action.payload.listId,
      });
    },
    taskSelected: (tasks, action) => {
      tasks.selectedId = action.payload;
    },
    taskUnselected: (tasks, action) => {
      tasks.selectedId = null;
    },
  },
});

export const { taskAdded, taskSelected, taskUnselected } = slice.actions;

export default slice.reducer;

export const getTasksByList = (listId: number) =>
  createSelector(
    (state) => state.tasks,
    (tasks: TasksState) =>
      listId ? tasks.list.filter((task) => task.listId === listId) : undefined
  );
