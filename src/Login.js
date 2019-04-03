import React, { Component } from 'react'
import { Card } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import './assets/iconfont/iconfont.css'
import Particles from 'react-particles-js'
import * as userActions from './actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
const Github = styled.div``

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handlerChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    })
  }

  login = () => {
    this.props
      .fetchLogin({
        account: this.state.username,
        password: this.state.password
      })
      .then(data => {
        window.localStorage.setItem('user', JSON.stringify(data))
        this.props.history.push('/')
      })
  }

  shouldComponentUpdate() {
    return false
  }

  githubLogin = event => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=79c7c7124c99c2c89d7c'
  }

  render() {
    return (
      <div>
        <Card
          style={{
            width: 400,
            margin: '200px 0 0 1000px',
            padding: '0 50px 50px'
          }}
        >
          <TextField
            style={{ marginTop: 20 }}
            onChange={e => this.handlerChange(e, 'username')}
            hintText="请输入用户名"
            floatingLabelText="用户名"
            fullWidth
            type="text"
          />
          <br />
          <TextField
            style={{ marginTop: 20 }}
            onChange={e => this.handlerChange(e, 'password')}
            hintText="请输入密码"
            floatingLabelText="密码"
            type="password"
            fullWidth
          />
          <RaisedButton
            label="登录"
            fullWidth
            onClick={this.login}
            style={{ marginTop: 40 }}
          />
          <br />
          <br />

          <Github onClick={this.githubLogin}>
            <i className="iconfont icon-github" style={{ fontSize: 22 }} />
            github登陆
          </Github>
        </Card>
        <Particles
          style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
          width={'100%'}
          height={'100%'}
        />
      </div>
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
)(withRouter(Login))
