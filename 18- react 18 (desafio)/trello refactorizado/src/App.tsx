import { Provider } from "react-redux";
// import { Routes, Route } from "react-router";
// import { ToastContainer } from "react-toastify";
// import configureStore from "./store/configureStore";
// import NavBar from "./components/navbar";
// import Home from "./components/home";
// import BoardList from "./components/boardlist";
// import RegisterForm from "./components/registerForm";
// import LoginForm from "./components/loginForm";
// import Lists from "./components/lists";
// import NotFound from "./components/notFound";
// import ProtectedRoute from "./components/common/protectedRoute";
import "./App.css";
// import User from "./components/user";

const store = configureStore();

function App() {
  return (
    <div className="container" style={{ maxWidth: "100%", padding: 0 }}>
      <ToastContainer />
      <Provider store={store}>
        <NavBar></NavBar>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/lists"
              element={
                <ProtectedRoute>
                  <Lists />
                </ProtectedRoute>
              }
            />
            <Route
              path="/boards"
              element={
                // <ProtectedRoute>
                <BoardList />
                // {/* </ProtectedRoute> */}
              }
            />
            <Route
              path="/user/:userName"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Provider>
    </div>
  );
}

export default App;
