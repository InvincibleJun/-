import React, { Component } from 'react';
import { getList, delArticle } from '../../services/article'
import { List } from "antd";
import { Link } from "react-router-dom";
import Dialog from "material-ui/Dialog";

class Manage extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    this.refresh()
  }
  refresh(query) {
    getList(query || {}).then(data => {
      this.setState({ data })
    })
  }
  publishDraft() {

  }
  delDraft(_id, draftID) {
    delArticle({ _id, draftID }).then(res => {
      this.refresh()
    })
  }
  render() {
    const { data } = this.state
    return (
      <div>
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item
              actions={[
                <a onClick={() => this.delDraft(item._id, item.draftID)}>删除</a>
              ]}
            >
              <h3>{item.title}</h3>
              <span>{item.createTime}</span>
            </List.Item>
          )} />
      </div>
    )
  }
}

export default Manage;