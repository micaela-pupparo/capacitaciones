import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import NavBar from "./components/navbar";
import BoardList from "./components/boardlist";
import "./App.css";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <NavBar></NavBar>
      <div className="app-container">
        <BoardList></BoardList>
      </div>
    </Provider>
  );
}

export default App;
