import React, { Component } from "react";
import { getDraft, postDraft } from "../../services/api";
import Item from "antd/lib/list/Item";

class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  async componentWillMount() {
    const data = await getDraft({ query: { page: 1, size: 12 } });
    this.setState({ data });
  }

  post = _id => {
    postDraft({ query: { _id } });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        {data.map(item => (
          <div key={item._id}>
            <div>{item.title}</div>
            <div>{item.createTime}</div>
            <button onClick={() => this.post(item._id)}>发表</button>
          </div>
        ))}
      </div>
    );
  }
}

export default Draft;
