import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./root.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./store.jsx";
import { composeWithDevTools } from "@redux-devtools/extension";

const store = createStore(reducer, composeWithDevTools());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
