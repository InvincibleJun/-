import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
import { Switch, Route } from 'react-router-dom'
import Index from './views'
import Edit from './views/article/index'
import Draft from './views/article/draft'
import Manage from './views/article/manage'
import * as userActions from './actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './App.css'
const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
class App extends Component {
  propTypes = {
    user: PropTypes.object,
    push: PropTypes.func,
    history: PropTypes.object
    // fetchUserInfo: PropTypes.func
  }
  state = {
    collapsed: false,
    timer: null
  }
  componentWillMount () {
    const { user } = this.props
    if (!user.loading) {
      // fetchUserInfo();
    }
  }
  componentDidMount () {
    this.hideLeft()
  }
  componentDidCatch () {
    clearTimeout(this.state.timer)
  }
  hideLeft = () => {
    clearTimeout(this.state.timer)
    const timer = setTimeout(() => {
      this.setState({ collapsed: true })
    }, 2000)
    this.setState({ timer })
  };
  toggle = () => {
    this.hideLeft()
    this.setState({
      collapsed: !this.state.collapsed
    })
  };
  to = ({ key }) => {
    const { push } = this.props.history
    push(key)
  };
  render () {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onClick={this.hideLeft}
        >
          <div className='logo' />
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['1']}
            onClick={this.to}
          >
            <Menu.Item key='/'>
              <Icon type='user' />
              <span>首页</span>
            </Menu.Item>
            <SubMenu
              title={
                <span>
                  <Icon type='appstore' />
                  <span>文章</span>
                </span>
              }
            >
              <Menu.Item key='/article'>编辑器</Menu.Item>
              <Menu.Item key='/article/draft'>草稿箱</Menu.Item>
              <Menu.Item key='/article/manage'>已发布</Menu.Item>
            </SubMenu>
            <Menu.Item key='3'>
              <Icon type='upload' />
              <span>统计</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <div style={{ padding: '24px 16px', overflow: 'auto' }}>
            <Content
              style={{
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}
            >
              <Switch>
                <Route exact path='/' component={Index} />
                <Route exact path='/article' component={Edit} />
                <Route path='/article/draft' component={Draft} />
                <Route path='/article/manage' component={Manage} />
              </Switch>
            </Content>
          </div>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
