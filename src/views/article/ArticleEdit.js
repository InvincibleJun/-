import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Ide from './_index/ide'
import ArticleStatus from './article-status'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import { lightGreen500 } from 'material-ui/styles/colors'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'
import { addArticle, getOneArticle } from '../../services/article'
import { withRouter } from 'react-router'

import ContentAdd from 'material-ui/svg-icons/content/add'
import { Lifecycle } from 'react-router'

const styles = {
  floatingLabelStyle: {
    color: lightGreen500
  },
  underlineFocusStyle: {
    borderColor: lightGreen500
  },
  floatingLabelFocusStyle: {
    color: lightGreen500
  }
}

const Line = styled.div`
  vertical-align: middle;
  overflow: hidden;
  width: ${props => props.width + 'px'};
  line-height: 40px;
  padding: 0 20px;
`
const Container = styled.div`
  flex: 1;
`

const AddItem = styled.div`
  margin-left: 40px;
  vertical-align: top;
  display: inline-block;
`

class Edit extends Component {
  mixins: [Lifecycle]

  static propTypes = {}

  state = {
    tagList: [],
    value: '',
    title: '',
    tags: [],
    status: -1,
    show: false
  }

  componentWillReceiveProps(nextProps) {
    const { active } = nextProps

    if (nextProps.active === 'new') {
      this.setState({
        value: '',
        title: [],
        tags: ''
      })
    } else if (this.props.active && active !== this.props.active) {
      const { loaded, body: value, tags, title } = active
      if (loaded) {
        this.setState({
          value,
          tags: tags.map(v => v._id),
          title
        })
      }
    }
  }

  addItem(show) {
    const { newTag } = this.state
    return !show ? (
      <FloatingActionButton
        label="Default"
        onClick={() => this.toggleAddItem(true)}
        style={{ margin: '30px 0 0 40px', verticalAlign: 'top' }}
        backgroundColor={lightGreen500}
        mini={true}
      >
        <ContentAdd />
      </FloatingActionButton>
    ) : (
      <AddItem>
        <TextField
          value={newTag}
          onChange={e => this.setState({ newTag: e.target.value })}
          {...styles}
          hintText="创建标签"
          floatingLabelText="输入标签"
        />
        <RaisedButton label="创建" onClick={this.createTag} />
      </AddItem>
    )
  }

  saveArticle = () => {
    const { title, value, tags } = this.state
    const { save } = this.props
    const { _id } = this.props.match.params
    save({
      _id: _id === 'new' ? '' : _id,
      title: title || moment().format('YYYY-MM-DD hh:mm:ss'),
      tags,
      body: value
    })
  }

  update = value => {
    this.setState({ value, edited: true })
  }

  createTag = () => {
    this.props.fetchAddTag({ name: this.state.newTag })
  }

  tagsChange = (event, index, tags) => {
    this.setState({ tags })
  }

  toggleAddItem = show => {
    this.setState({ show })
  }

  clear = () => {
    this.setState({
      title: '',
      _id: '',
      value: '',
      tags: []
    })
  }

  changTitle = e => {
    this.setState({ title: e.target.value })
  }

  render() {
    const { list } = this.props
    const { value, title, tags, show } = this.state

    return (
      <Container>
        <Line width={700}>
          <TextField
            fullWidth={true}
            {...styles}
            hintText="输入文章标题"
            floatingLabelText="标题"
            type="text"
            value={title}
            onChange={this.changTitle}
          />
        </Line>
        <Line width={800}>
          <SelectField
            {...styles}
            fullWidth={false}
            multiple={true}
            hintText="选择标签"
            floatingLabelText="标签"
            value={tags}
            onChange={this.tagsChange}
          >
            {list.map(({ _id, name }) => (
              <MenuItem
                key={_id}
                insetChildren={true}
                checked={tags && tags.indexOf(_id) > -1}
                value={_id}
                primaryText={name}
              />
            ))}
          </SelectField>
          {this.addItem(show)}
        </Line>
        <ArticleStatus status={1} />
        <Ide value={value} update={this.update} />
        <RaisedButton
          backgroundColor={lightGreen500}
          style={{ marginLeft: 20, color: '#fff' }}
          onClick={this.saveArticle}
        >
          保存
        </RaisedButton>
        <RaisedButton style={{ marginLeft: 20 }} onClick={this.clear}>
          清空
        </RaisedButton>
      </Container>
    )
  }
}
export default withRouter(Edit)
