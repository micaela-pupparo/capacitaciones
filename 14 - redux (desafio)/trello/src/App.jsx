import React from "react";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import configureStore from "./store/configureStore";
import NavBar from "./components/navbar";
import BoardList from "./components/boardlist";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import ProtectedRoute from "./components/common/protectedRoute";
import "./App.css";

const store = configureStore();

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Provider store={store}>
        <NavBar></NavBar>
        <div className="app-container">
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              index
              path="/"
              element={
                <ProtectedRoute>
                  <BoardList />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/movies/:id" component={MovieForm} /> */}
            {/* <Route path="/movies" component={TableOfMovies} /> */}
            {/* <Route path="/customers" component={Customers} /> */}
            {/* <Route path="/rentals" component={Rentals} /> */}
            {/* <Route path="/not-found" component={NotFound} /> */}
            {/* <Redirect from="/" exact to="movies" />
            <Redirect to="/not-found" /> */}
          </Routes>
        </div>
      </Provider>
    </React.Fragment>
  );
}

export default App;
