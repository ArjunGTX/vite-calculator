import { Provider } from "react-redux";
import "./App.css";
import { Calculator } from "./components";
import { store } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Calculator />
      </Provider>
    </div>
  );
}

export default App;
