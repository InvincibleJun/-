import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import load from "./load";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers";

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <Route path="/" component={load} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
