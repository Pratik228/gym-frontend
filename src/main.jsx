import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./bootstrap.custom.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

import store from "./store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
