/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createSelector } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  username: string;
}

interface UserState {
  list: User[];
  logged: User | null;
}

let lastId = 10;

const initialState: UserState = {
  list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
  logged: null, 
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // action => action handler
    userAdded: (users, action) => {
      users.list.push({
        id: ++lastId,
        name: action.payload.name,
        username: action.payload.username,
      });
    },
    userModified: (users, action) => {
      const user = users.list.find(
        (user) => user.username === action.payload.username
      );
      if (user) {
        user.name = action.payload.name;
        user.username = action.payload.username;
        users.logged = action.payload;
      }
    },
    userDeleted: (users, action) => {
      const user = users.list.findIndex(
        (user) => user.username === action.payload.username
      );

      if (user) {
        users.list.splice(user, 1);
        users.logged = null;
      }
    },
    userLoggedIn: (users, action) => {
      console.log(action);
      users.logged = action.payload;
    },
    userLoggedOut: (users, action) => {
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
