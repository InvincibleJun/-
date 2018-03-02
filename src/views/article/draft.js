import React, { Component } from "react";
// import { getDraft, postDraft } from "../../services/api";
import { List } from "antd";
import * as draftActions from "../../actions/draft";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    const { getDraft } = this.props;
    getDraft({ query: { page: 1, size: 15 } });
  }
  edit() {
    console.log(this.props);
  }
  render() {
    const { publishDraft, draft } = this.props;
    console.log(this.props);
    return (
      <div>
        <List
          dataSource={draft.data}
          renderItem={item => (
            <List.Item
              actions={[
                <a onClick={() => publishDraft({ query: { _id: item._id } })}>
                  发表
                </a>,
                <Link to={"/article?_id=" + item._id}>编辑</Link>,
                <a>删除</a>
              ]}
            >
              <h3>{item.title}</h3>
              <span>{item.createTime}</span>
            </List.Item>
          )}
        />
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
