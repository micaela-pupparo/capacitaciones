import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { navigateTo } from "../utils";
import usersReducer, { User } from "../../src/store/users";
import boardsReducer from "../../src/store/boards.ts";
import listsReducer from "../../src/store/lists.ts";
import { RootState } from "../../src/store/configureStore";

describe("NavBar", () => {
  function renderNavBar(info?: User) {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
      preloadedState: {
        users: {
          list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
          logged: info ? info : null,
        },
      },
    });

    navigateTo("/", store);
  } 

  beforeEach(() => {
    cleanup();
  });

  it.each([
    {
      variant: "white",
      path: "/",
      preloadedState: {
        users: {
          list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
          logged: null,
        },
      },
    },
    {
      variant: "pink",
      path: "/user/lists",
      preloadedState: {
        users: {
          list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
          logged: { username: "mica@gmail.com", name: "Micaela" },
        },
        boards: {
          list: [{ id: 1, name: "tablero", userId: 1, order: [] }],
          selectedId: 1,
        },
        lists: {
          list: [{ id: 1, name: "lista 1", boardId: 1 }],
          selectedId: 1,
        },
      },
    },
  ])(
    "should render the nav with $variant theme for $path",
    async ({ variant, path, preloadedState }) => {
      const store = configureStore({
        reducer: combineReducers({
          users: usersReducer,
          boards: boardsReducer,
          lists: listsReducer,
        }),
        preloadedState: preloadedState as Partial<RootState>,
      });

      navigateTo(path, store);

      await waitFor(() => {
        const nav = screen.getByRole("navigation");
        expect(nav).toHaveAttribute("data-variant", variant);
      });
    }
  );

  it("should render a login button if user is not logged", async () => {
    renderNavBar()

    const button = await screen.findByRole("button", {name: /log in/i});
    expect(button).toBeInTheDocument();
  });

  it("should render a user button if user is logged", async () => {
    renderNavBar({ id: 1,username: "mica@gmail.com", name: "Micaela" });

    const button = await screen.findByRole("button", {name: /mp/i});
    expect(button).toBeInTheDocument();
  });
});
