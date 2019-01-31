import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getOneArticle } from '../../services/article'
import ArticleList from './article-list'
import ArticleEdit from './article-edit'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tagActions from '../../actions/tag'
import * as articleActions from '../../actions/article'

const Container = styled.div`
  display: flex;
  position: relative;
`

let timer

class Ed extends Component {
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

  // componentWillReceiveProps(nextProps) {
  //   const params = nextProps.match.params
  //   this.setState({
  //     params
  //   })
  // }

  componentDidMount() {
    const { type, tag, _id } = this.props.match.params

    this.props.changeActive(_id)
    this.props.fetchTagsData()
    this.props.fetchGetList({ type, tag })
    timer = setInterval(() => {
      if (this.state.edited) {
        this.saveArticle()
      }
    }, 10000)
  }

  open = _id => {
    // const { type, tag } = this.props.match.params
    // const { openArticle } = this.props
    // this.setState({ edited: false })
    // this.props.history.push(`/article/${type}/${tag}/${_id}`)
    // this.props.changeActive(_id)
    // openArticle(_id, active)
    // this.props.openArticle(_id, active)
  }

  push = (key, value) => {
    this.props.match.params[key] = value
    const { type, tag, _id } = this.props.match.params
    this.props.history.push(`/article/${type}/${tag}/${_id}`)
    // 重新获得列表
    this.props.fetchGetList()
  }

  render() {
    const { fetchAddTag, fetchAddArticle, tag, article, match } = this.props
    const { list: tagList } = tag
    const { list: articleList, active } = article

    return (
      <Container style={{ position: 'relative' }}>
        <ArticleList
          matched={match.params}
          open={this.open}
          list={tagList}
          articleList={articleList}
          push={this.push}
          // active={_id}
        />
        <ArticleEdit
          list={tagList}
          active={active}
          save={fetchAddArticle}
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
)(Ed)
