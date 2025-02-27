import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import usersReducer, { User } from "../../../src/store/users";
import RegisterForm from "../../../src/components/common/RegisterForm";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

describe("RegisterForm", () => {
  function renderRegisterForm(user?: User) {
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
          <RegisterForm />
        </BrowserRouter>
      </Provider>
    );

    return {
      form: screen.getAllByRole("form"),
      usernameInput: screen.getByPlaceholderText(/usuario/i),
      passwordInput: screen.getByPlaceholderText(/contraseña/i),
      nameInput: screen.getByRole('textbox', { name: "name" }),
      submitButton: screen.getByRole("button"),
    };
  }

  beforeEach(() => {
    cleanup();
  });

  it("should render form fields", () => {
    const { usernameInput, passwordInput, nameInput } = renderRegisterForm();

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  it("should not enable the submit button if username is missing", async () => {
    const { passwordInput, nameInput, submitButton } = renderRegisterForm();

    const user = userEvent.setup();
    await user.type(passwordInput, "1234");
    await user.type(nameInput, "mica");

    expect(submitButton).toBeDisabled();
  });

  it("should not enable the submit button if password is missing", async () => {
    const { usernameInput, nameInput, submitButton } = renderRegisterForm();

    const user = userEvent.setup();
    await user.type(usernameInput, "mica@gmail.com");
    await user.type(nameInput, "mica");

    expect(submitButton).toBeDisabled();
  });

  it("should not enable the submit button if name is missing", async () => {
    const { usernameInput, passwordInput, submitButton } = renderRegisterForm();

    const user = userEvent.setup();
    await user.type(usernameInput, "mica@gmail.com");
    await user.type(passwordInput, "1234"); 

    expect(submitButton).toBeDisabled();
  });

  it("should enable the submit button if all inputs are filled", async () => {
    const { usernameInput, passwordInput, nameInput, submitButton } = renderRegisterForm();

    const user = userEvent.setup();
    await user.type(usernameInput, "mica@gmail.com");
    await user.type(passwordInput, "1234");
    await user.type(nameInput, "mica");

    expect(submitButton).not.toBeDisabled();
  });
});