import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import usersReducer from "../../src/store/users";
import boardsReducer from "../../src/store/boards.ts";
import listsReducer, { List } from "../../src/store/lists.ts";
import tasksReducer from "../../src/store/tasks";
import Lists from "../../src/components/Lists";
import { BrowserRouter } from "react-router";

describe("Lists", () => {
  function renderLists(id?: number, list?: List) {
    const store = configureStore({
      reducer: combineReducers({
        users: usersReducer,
        boards: boardsReducer,
        lists: listsReducer,
        tasks: tasksReducer,
      }),
      preloadedState: {
        users: {
          list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
          logged: { id: 1, username: "mica@gmail.com", name: "Micaela" },
        },
        boards: {
          list: [{ id: 1, name: "tablero", userId: 1, order: list ? [list.id] : [] }],
          selectedId: id ? id : null,
        },
        lists: {
          list: list ? [list] : [],
          selectedId: null,
        },
        tasks: {
            list: [],
            selectedId: null
        }
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Lists />
        </BrowserRouter>
      </Provider>
    );
  }

  beforeEach(() => {
    cleanup();
  });

  it("should render nothing if id is not provided", () => {
    renderLists();

    const board = screen.queryByRole("board");

    expect(board).not.toBeInTheDocument();
  });

  it("should render the board content if id is provided", () => {
    renderLists(1);

    const board = screen.queryByRole("board");

    expect(board).toBeInTheDocument();
  });

  it("should not render the lists if there are none", () => {
    renderLists(1);

    const list = screen.queryByRole('article', {name: 'list'});
    console.log(list);
    

    expect(list).not.toBeInTheDocument();
  });

  it("should render the lists if they exist", () => {
    renderLists(1, { id: 1, name: "lista", boardId: 1 });
    
    const list = screen.getByRole('article', {name: 'list'});
    
    expect(list).toBeInTheDocument();
  });

  it("should not render the form for new list if user did not click the add button", () => {
    renderLists(1);

    expect(screen.queryByRole("button", { name: /añadir/i })).not.toBeInTheDocument();
  });

  it("should render the form for new task if user clicked the add button", async () => {
    renderLists(1);

    const button = screen.getByText(/añade/i);
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByRole("button", { name: /añadir/i })).toBeInTheDocument();
  });
});