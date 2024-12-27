import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    logged: null,
  },
  reducers: {
    // action => action handler
    userAdded: (users, action) => {
      console.log(action);
      users.list.push({
        id: ++lastId,
        name: action.payload.name,
        username: action.payload.username,
      });
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

export const { userAdded, userLoggedIn, userLoggedOut } = slice.actions;

export default slice.reducer;
