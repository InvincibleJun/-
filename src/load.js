import React, { Component } from "react";
import { Card, CardHeader } from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <Card style={{ width: 350, margin: 100, padding: "0 50px 50px" }}>
        <TextField
          hintText="请输入用户名"
          floatingLabelText="用户名"
          fullWidth={true}
          type="text"
        />
        <br />
        <TextField
          hintText="请输入密码"
          floatingLabelText="密码"
          type="password"
          fullWidth={true}
        />
        <RaisedButton label="登录" fullWidth={true} style={{ marginTop: 20 }} />
      </Card>
    );
  }
}

export default Load;
