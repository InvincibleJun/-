import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(

  <MuiThemeProvider>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
