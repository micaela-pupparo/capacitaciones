import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import BoardList from "./components/BoardList";
import RegisterForm from "./components/common/RegisterForm";
import LoginForm from "./components/common/LoginForm";
import Lists from "./components/Lists";
// import NotFound from "./components/notFound";
import "./App.css";
import PrivateRoutes from "./components/routing/PrivateRoutes";
// import User from "./components/user";

function App() {
  return (
    <div className="container">
      <NavBar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/user" element={<PrivateRoutes />}>
            <Route path="lists" element={<Lists />} />
            <Route path="boards" element={<BoardList />} />
          </Route>
          {/* <Route
              path="/user/:userName"
              element={
                // <ProtectedRoute>
                  // <User />
                // </ProtectedRoute>
              }
            /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
