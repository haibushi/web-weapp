import React from "react";
import Routes from "./routes/index";
import "antd/dist/antd.css";
import Store from "./store";
import "./App.css";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
