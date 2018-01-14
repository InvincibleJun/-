import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Admin from "./admin";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "antd/dist/antd.css";

ReactDOM.render(
  <MuiThemeProvider>
    <Admin />
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
