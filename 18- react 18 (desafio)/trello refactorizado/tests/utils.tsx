import React from "react";
import { createMemoryRouter, RouterProvider, RouteObject } from "react-router";
import { render } from "@testing-library/react";
import usersReducer from "../src/store/users";
import App from "../src/App";
import Home from "../src/components/Home";
import RegisterForm from "../src/components/common/RegisterForm";
import LoginForm from "../src/components/common/LoginForm";
import PrivateRoutes from "../src/components/routing/PrivateRoutes";
import BoardList from "../src/components/BoardList";
import Lists from "../src/components/Lists";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const routes: RouteObject[] = [
  {
    path: "*",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <LoginForm /> },
      {
        path: "user",
        element: <PrivateRoutes />,
        children: [
          { path: "boards", element: <BoardList /> },
          { path: "lists", element: <Lists /> },
        ],
      },
    ],
  },
];

export const navigateTo = (path: string, store: ReturnType<typeof configureStore>) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  });

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
