import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Load from "./load";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "antd/dist/antd.css";

ReactDOM.render(
  <MuiThemeProvider>
    <Load />
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
