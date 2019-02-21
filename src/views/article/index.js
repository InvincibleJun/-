import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { getOneArticle } from '../../services/article'
import ArticleList from './ArticleList'
import ArticleEdit from './ArticleEdit'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tagActions from '../../actions/tag'
import * as articleActions from '../../actions/article'

const Container = styled.div`
  display: flex;
  position: relative;
`

let timer

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: null,
      tagList: [],
      value: '',
      title: '',
      tags: [],
      status: -1,
      newTag: '',
      show: false,
      edited: false
    }
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  componentDidMount() {
    const { type, tag, _id } = this.props.match.params

    this.props.fetchTagsData()
    this.props.fetchGetList({ type, tag }).then(() => {
      this.props.changeActive(_id)
    })
    this.props.openArticle(_id)

    timer = setInterval(() => {
      if (this.state.edited) {
        this.saveArticle()
      }
    }, 10000)
  }

  open = _id => {
    this.push('_id', _id, false)
    this.props.openArticle(_id)
  }

  save = option => {
    this.props.fetchAddArticle(option).then(res => {
      this.push('_id', res._id, false)
    })
  }

  push = (key, value, refresh = true) => {
    if (key === '_id') {
      this.props.changeActive(value)
    }

    this.props.match.params[key] = value
    const { type, tag, _id } = this.props.match.params
    this.props.history.push(`/article/${type}/${tag}/${_id}`)
    // 重新获得列表
    refresh && this.props.fetchGetList({ type, tag })
  }

  render() {
    const {
      fetchAddTag,
      tag,
      article,
      match,
      fetchdeleteArticle,
      fetchPublishArticle
    } = this.props
    const { list: tagList } = tag
    const { list: articleList, active } = article

    return (
      <Container style={{ position: 'relative' }}>
        <ArticleList
          matched={match.params}
          open={this.open}
          list={tagList}
          deleteArticle={fetchdeleteArticle}
          articleList={articleList}
          push={this.push}
          active={active}
          publishArticle={fetchPublishArticle}
        />
        <ArticleEdit
          list={tagList}
          active={active}
          save={this.save}
          fetchAddTag={fetchAddTag}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    tag: state.tag,
    article: state.article
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...tagActions, ...articleActions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
