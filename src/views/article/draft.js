import React, { Component } from 'react'
// import { getDraft, postDraft } from "../../services/api";
import PropTypes from 'prop-types'
import { List } from 'antd'
import * as draftActions from '../../actions/draft'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class Draft extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      del: {},
      delDialog: false
    }
  }
  componentWillMount () {
    const { getDraft } = this.props
    getDraft({ query: { page: 1, size: 15 } })
  }
  edit () {
    console.log(this.props)
  }
  delDraft (_id, title) {
    this.setState({ delDialog: true, del: { _id, title } })
  }
  handleCloseDialog () {
    this.setState({ delDialog: false })
  }
  delRequest () {
    const { _id } = this.state.del
    const { delDraft } = this.props
    delDraft({ _id }, () => {
      this.setState({ delDialog: false })
    })
  }
  render () {
    const { publishDraft, draft } = this.props
    const { delDialog } = this.state
    const actions = [
      <FlatButton
        label='取消'
        primary
        onClick={() => this.handleCloseDialog()}
      />,
      <FlatButton
        label='确定'
        primary
        onClick={() => this.delRequest()}
      />
    ]

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
                <Link to={'/article?_id=' + item._id}>编辑</Link>,
                <a onClick={() => this.delDraft(item._id, item.title)}>删除</a>
              ]}
            >
              <h3>{item.title}</h3>
              <span>{item.createTime}</span>
            </List.Item>
          )}
        />
        <Dialog title='警告' actions={actions} modal={false} open={delDialog}>
          确认删除 {this.state.del.title} 吗？
        </Dialog>
      </div>
    )
  }
}

Draft.propTypes = {
  getDraft: PropTypes.func,
  delDraft: PropTypes.func,
  publishDraft: PropTypes.func,
  draft: PropTypes.object
}

const mapStateToProps = state => {
  return { draft: state.draft }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(draftActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft)
