import React, { Component } from "react";
import { getDraft, postDraft } from "../../services/api";
import { List } from "antd";
import * as draftActions from "../../actions/draft";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const data = [1, 2, 3, 4, 5];

class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    const { getDraft } = this.props;
    getDraft({ query: { page: 1, size: 12 } });
  }

  post = _id => {
    postDraft({ query: { _id } });
  };

  render() {
    const { draft } = this.props;
    return (
      <div>
        <List
          dataSource={draft.data}
          renderItem={item => (
            <List.Item actions={[<a>发表</a>, <a>编辑</a>, <a>删除</a>]}>
              <h3>{item.title}</h3>
              <span>{item.createTime}</span>
            </List.Item>
          )}
        />
        {draft.data.map(item => (
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

const mapStateToProps = state => {
  return { draft: state.draft };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(draftActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft);
