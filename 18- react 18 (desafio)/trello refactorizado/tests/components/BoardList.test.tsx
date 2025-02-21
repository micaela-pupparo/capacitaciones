import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import usersReducer from "../../src/store/users";
import boardsReducer from "../../src/store/boards.ts";
import BoardList from "../../src/components/BoardList.tsx";
import { BrowserRouter } from "react-router";

describe("BoardList", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render a new board heading", () => {
    const store = configureStore({
      reducer: combineReducers({
        users: usersReducer,
        boards: boardsReducer,
      }),
      preloadedState: {
        users: {
          list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
          logged: { id: 1, username: "mica@gmail.com", name: "Micaela" },
        },
        boards: {
          list: [{ id: 1, name: "tablero", userId: 1, order: [] }],
          selectedId: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BoardList />
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByRole("heading", { name: /nuevo/i });
    expect(button).toBeInTheDocument();
  });

  it("should not render list of boards if boards is not provided", () => {
    const store = configureStore({
      reducer: combineReducers({
        users: usersReducer,
        boards: boardsReducer,
      }),
      preloadedState: {
        users: {
          list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
          logged: { id: 1, username: "mica@gmail.com", name: "Micaela" },
        },
        boards: {
          list: [],
          selectedId: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BoardList />
        </BrowserRouter>
      </Provider>
    );

    const button = screen.queryByRole("board");
    expect(button).not.toBeInTheDocument();
  });

  it("should not render list of boards if boards is not provided", () => {
    const store = configureStore({
      reducer: combineReducers({
        users: usersReducer,
        boards: boardsReducer,
      }),
      preloadedState: {
        users: {
          list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
          logged: { id: 1, username: "mica@gmail.com", name: "Micaela" },
        },
        boards: {
          list: [{ id: 1, name: "tablero", userId: 1, order: [] }],
          selectedId: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BoardList />
        </BrowserRouter>
      </Provider>
    );

    const button = screen.queryByRole("board");
    expect(button).toBeInTheDocument();
  });
});
