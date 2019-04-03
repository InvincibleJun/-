import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Lifecycle } from 'react-router'
import Edit from './views/article/Index'
import * as userActions from './actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LeftMenu from './components/LeftMenu'
import './App.css'
import styled from 'styled-components'
import Login from './Login'

import Cookies from 'js-cookie'

const config = [
  {
    name: '文章',
    path: '/article'
  },
  {
    name: '其他',
    path: '/other'
  }
]

const Layout = styled.div`
  display: flex;
`

const Right = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  height: 60px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
  z-index: 1;
`

const Content = styled.div`
  flex: 1;
  background-color: rgb(240, 240, 240);
`

class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    push: PropTypes.func,
    history: PropTypes.object
  }

  mixins: [Lifecycle]

  routerWillEnter(nextLocation) {
    console.log(nextLocation)
  }

  to = ({ key }) => {
    const { push } = this.props.history
    push(key)
  }

  render() {
    const { pathname } = this.props.location

    if (pathname === '/login') {
      return <Login />
    }

    const token = Cookies.get('token')

    if (!token) {
      return <Redirect to="/login" />
    }

    return (
      <Layout style={{ height: '100vh' }}>
        <LeftMenu config={config} path={pathname} to={this.to} />
        <Right>
          <Header />
          <Content>
            <Switch>
              <Redirect exact from="/" to="/article/draft/标签/new" />
              <Route exact path="/article/:type/:tag/:_id" component={Edit} />
            </Switch>
          </Content>
        </Right>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
