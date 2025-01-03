import { createSlice, createSelector, current } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    logged: { username: "mica@gmail.com", name: "Micaela" },
  },
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
      user.name = action.payload.name;
      user.username = action.payload.username;
      users.logged = action.payload;
    },
    userDeleted: (users, action) => {
      const user = users.list.findIndex(
        (user) => user.username === action.payload.username
      );

      users.list.splice(user, 1);
      users.logged = null;
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
  (users) =>
    users.logged
      ? users.list.find((user) => user.username === users.logged.username)
      : undefined
);
