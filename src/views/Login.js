import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from './actions/user'

class Login extends Component {
  render() {
    return (
      <div>
        <TextField
          hintText="Password Field"
          floatingLabelText="账号"
          type="text"
        />
        <TextField
          hintText="Password Field"
          floatingLabelText="密码"
          type="password"
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
)(Login)
