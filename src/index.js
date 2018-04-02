import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import App from './App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './reducers'

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <Route path='/' component={App} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
