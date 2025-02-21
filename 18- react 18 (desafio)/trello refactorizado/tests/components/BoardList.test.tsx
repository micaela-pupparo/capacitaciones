import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import usersReducer from "../../src/store/users";
import boardsReducer, { Board } from "../../src/store/boards.ts";
import BoardList from "../../src/components/BoardList.tsx";
import { BrowserRouter } from "react-router";

describe("BoardList", () => {
    function renderBoardList(info?: Board) {
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
                list: info ? [info] : [],
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
    }

  beforeEach(() => {
    cleanup();
  });

  it("should render a new board heading", () => {
    renderBoardList()

    const button = screen.getByRole("heading", { name: /nuevo/i });
    expect(button).toBeInTheDocument();
  });

  it("should not render list of boards if boards is not provided", () => {
    renderBoardList();

    const button = screen.queryByRole("board");
    expect(button).not.toBeInTheDocument();
  });

  it("should not render list of boards if boards is not provided", () => {
    renderBoardList({ id: 1, name: "tablero", userId: 1, order: [] });

    const button = screen.queryByRole("board");
    expect(button).toBeInTheDocument();
  });
});
