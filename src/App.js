import TypeScreen from "./mainapp/components/TypeScreen";

import "./App.css";
import { Provider, useSelector } from "react-redux";
import store from "./mainapp/app/store";

function App() {
  return (
    <Provider store={store}>
      <TypeScreen />
    </Provider>
  );
}

export default App;
