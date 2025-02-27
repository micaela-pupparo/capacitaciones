import { describe, it, expect, beforeEach } from "vitest";
import { cleanup, screen } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { navigateTo } from "./utils";
import usersReducer from "../src/store/users";
import boardsReducer from "../src/store/boards.ts";
import listsReducer, { List } from "../src/store/lists.ts";
import tasksReducer from "../src/store/tasks";

describe('Router', () => {
    beforeEach(() => {
        cleanup();
    })

    it('should render the home component when /', () => {
        const store = configureStore({
            reducer: {
              users: usersReducer,
            },
            preloadedState: {
              users: {
                list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
                logged: null,
              },
            },
          });

        navigateTo('/', store);

        expect(screen.getByRole('heading', { level: 2, name: /trello/i })).toBeInTheDocument();
    });

    it('should render the login page component when /login', () => {
        const store = configureStore({
            reducer: {
              users: usersReducer,
            },
            preloadedState: {
              users: {
                list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
                logged: null,
              },
            },
          });

        navigateTo('/login', store);

        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('should render the register page component when /register', () => {
        const store = configureStore({
            reducer: {
              users: usersReducer,
            },
            preloadedState: {
              users: {
                list: [{ id: 1, username: "mica@gmail.com", name: "Micaela" }],
                logged: null,
              },
            },
          });

        navigateTo('/register', store);

        expect(screen.getByRole('button', { name: /registrarme/i })).toBeInTheDocument();
    });

    it('should render the lists page component when /user/lists', () => {
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
                list: [{ id: 1, name: "tablero", userId: 1, order: [1] }],
                selectedId: 1,
              },
              lists: {
                list: [],
                selectedId: null,
              },
              tasks: {
                  list: [],
                  selectedId: null
              }
            },
          });

        navigateTo('/user/lists', store);

        expect(screen.getByRole('button', { name: 'new-list' })).toBeInTheDocument();
    });

    it('should render the boards page component when /user/boards', () => {
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
                list: [{ id: 1, name: "tablero", userId: 1, order: [1] }],
                selectedId: 1,
              },
              lists: {
                list: [],
                selectedId: null,
              },
              tasks: {
                  list: [],
                  selectedId: null
              }
            },
          });

        navigateTo('/user/boards', store);

        expect(screen.getByRole('button', { name: /crear/i })).toBeInTheDocument();
    });
})