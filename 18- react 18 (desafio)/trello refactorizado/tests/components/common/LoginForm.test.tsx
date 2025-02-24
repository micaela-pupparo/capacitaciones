import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import usersReducer, { User } from "../../../src/store/users";
import LoginForm from "../../../src/components/common/LoginForm";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

describe("LoginForm", () => {
  function renderLoginForm(user?: User) {
    const store = configureStore({
      reducer: combineReducers({
        users: usersReducer,
      }),
      preloadedState: {
        users: {
          list: user ? [user] : [],
          logged: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    return {
      form: screen.getAllByRole("form"),
      usernameInput: screen.getByPlaceholderText(/usuario/i),
      passwordInput: screen.getByPlaceholderText(/contraseña/i),
      submitButton: screen.getByRole("button"),
    };
  }

  beforeEach(() => {
    cleanup();
  });

  it("should render form fields", () => {
    const { usernameInput, passwordInput } = renderLoginForm();

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("should not enable the submit button if username is missing", async () => {
    const { passwordInput, submitButton } = renderLoginForm();

    const user = userEvent.setup();
    await user.type(passwordInput, "1234");

    expect(submitButton).toBeDisabled();
  });

  it("should not enable the submit button if password is missing", async () => {
    const { usernameInput, submitButton } = renderLoginForm();

    const user = userEvent.setup();
    await user.type(usernameInput, "mica@gmail.com");

    expect(submitButton).toBeDisabled();
  });

  it("should enable the submit button if all inputs are filled", async () => {
    const { usernameInput, passwordInput, submitButton } = renderLoginForm();

    const user = userEvent.setup();
    await user.type(usernameInput, "mica@gmail.com");
    await user.type(passwordInput, "1234");

    expect(submitButton).not.toBeDisabled();
  });
});

// { id: 1, username: "mica@gmail.com", name: "Micaela" }
