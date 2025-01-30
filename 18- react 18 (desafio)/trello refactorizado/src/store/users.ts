/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createSelector } from "@reduxjs/toolkit";

let lastId = 0;

interface User {
  id?: number;
  name: string;
  username: string;
}

interface UserState {
  list: User[];
  logged: User | null;
}

const slice = createSlice({
  name: "users",
  initialState: {
    list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
    logged: { username: "mica@gmail.com", name: "Micaela" },
  },
  reducers: {
    // action => action handler
    userAdded: (users: UserState, action) => {
      users.list.push({
        id: ++lastId,
        name: action.payload.name,
        username: action.payload.username,
      });
    },
    userModified: (users: UserState, action) => {
      const user = users.list.find(
        (user) => user.username === action.payload.username
      );
      if (user) {
        user.name = action.payload.name;
        user.username = action.payload.username;
        users.logged = action.payload;
      }
    },
    userDeleted: (users: UserState, action) => {
      const user = users.list.findIndex(
        (user) => user.username === action.payload.username
      );

      if (user) {
        users.list.splice(user, 1);
        users.logged = null;
      }
    },
    userLoggedIn: (users: UserState, action) => {
      console.log(action);
      users.logged = action.payload;
    },
    userLoggedOut: (users: UserState, action) => {
      users.logged = null;
    },
  },
});

export const {
  userAdded,
  userLoggedIn,
  userLoggedOut,
  userModified,
  userDeleted,
} = slice.actions;

export default slice.reducer;

export const getUserId = createSelector(
  (state) => state.users,
  (users: UserState) => {
    if (!users.logged) return undefined;
    return users.list.find((user) => user.username === users.logged!.username);
  }
);

// el signo de exclamacion asegura que no sea nulo. non-null assertion operator
