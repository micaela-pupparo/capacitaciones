import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import usersReducer from "../../src/store/users";
import boardsReducer from "../../src/store/boards.ts";
import listsReducer from "../../src/store/lists.ts";
import tasksReducer, { Task } from "../../src/store/tasks";
import List from "../../src/components/List";
import { BrowserRouter } from "react-router";

describe("List", () => {
  function renderList(id?: number, task?: Task) {
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
          list: [{ id: 1, name: "tablero", userId: 1, order: [] }],
          selectedId: 1,
        },
        lists: {
          list: [{ id: 1, name: "lista", boardId: 1 }],
          selectedId: id ? id : null,
        },
        tasks: {
          list: task ? [task] : [],
          selectedId: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <List id={id ? id : undefined} />
        </BrowserRouter>
      </Provider>
    );
  }

  beforeEach(() => {
    cleanup();
  });

  it("should render nothing if id is not provided", () => {
    renderList();

    const articles = screen.queryByRole("article");

    expect(articles).not.toBeInTheDocument();
  });

  it("should render the list if id is  provided", () => {
    renderList(1);

    const articles = screen.queryByRole("article");
    const title = screen.getByText(/lista/i);

    expect(articles).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it("should not render the the task if not provided", () => {
    renderList(1);

    const task = screen.queryByText(/tarea/i);

    expect(task).not.toBeInTheDocument();
  });

  it("should render the the task if provided", () => {
    renderList(1, { id: 1, name: "tarea", listId: 1 });

    const task = screen.queryByText(/tarea/i);

    expect(task).toBeInTheDocument();
  });

  it("should not render the form for new task if user did not click the add button", () => {
    renderList(1);

    expect(screen.queryByRole("button", { name: /añadir/i })).not.toBeInTheDocument();
  });

  it("should render the form for new task if user clicked the add button", async () => {
    renderList(1);

    const button = screen.getByText(/añade/i);
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByRole("button", { name: /añadir/i })).toBeInTheDocument();
  });
});
