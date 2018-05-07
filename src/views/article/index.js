import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Ide from './_index/ide'
import { addDraft, getOneDraft } from '../../services/draft'
import { addTag, getTag } from '../../services/tag'
import { Input, Select, Button, Modal } from 'antd'
import getQuery from '../../utils/getQuery'
import styled from 'styled-components'
const Option = Select.Option

const Label = styled.label`
  padding: 0 20px;
`

const Line = styled.div`
  line-height: 40px;
`

class Ed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tagList: [],
      visible: false,
      file: '',
      value: '',
      title: '',
      _id: '',
      tags: []
    }
  }

  componentDidMount () {
    this.getTagList()
    const { search } = this.props.location
    if (search) {
      const { _id } = getQuery(search)
      getOneDraft({ _id }).then(res => {
        this.setState({ title: res.title, _id: res._id, value: res.body, tags: res.tags })
      })
    }
  }

  getTagList = () => {
    getTag().then(res => {
      this.setState({tagList: res})
    })
  }

  pushDraft = () => {
    const { title, _id, value, tags } = this.state
    addDraft({
      _id,
      title,
      tags,
      body: value
    }).then(res => {
      this.setState({ _id: res._id })
    })
  };

  clearDraft = () => {
    this.simplemde.value('')
  };

  changTitle = e => {
    this.setState({ title: e.target.value })
  };

  update = value => {
    this.setState({ value })
  };

  showAddTag = () => {
    this.setState({ visible: true })
  }

  addTagOk = () => {
    let value = this.refs['newTagInput'].input.value
    value &&
    addTag({name: value}).then(res => {
      this.addTagCancel()
      getTag().then(res => {})
    })
  }

  addTagCancel = () => {
    this.setState({ visible: false }, () => {
      this.refs['newTagInput'].input.value = ''
    })
  }

  tagsChange = tags => {
    this.setState({ tags })
  }

  render () {
    const { value, title, visible, tagList, tags } = this.state
    return (
      <div style={{ position: 'relative' }}>
        <Line>
          <Label>标题</Label>
          <Input value={title} style={{ width: 500 }} onChange={this.changTitle} />
        </Line>
        <Line>
          <Label>标签</Label>
          <Select
            mode='multiple'
            value={tags}
            labelInValue
            onChange={this.tagsChange}
            style={{ width: 380, marginRight: 30 }}
            tokenSeparators={[',']}
          >
            {tagList.map(item => (<Option key={item._id}>{item.name}</Option>))}
          </Select>
          <Button onClick={this.showAddTag}>新增标签</Button>
        </Line>
        <Ide value={value} update={this.update} />
        <Modal title='Title'
          visible={visible}
          onOk={this.addTagOk}
          // confirmLoading={this.addTag}
          onCancel={this.addTagCancel}
        >
          <Input ref='newTagInput' />
        </Modal>
        <Button onClick={this.pushDraft}>添加草稿</Button>
        <Button onClick={this.clearDraft}>清空</Button>
      </div>
    )
  }
}

Ed.propTypes = {
  location: PropTypes.string
}

export default Ed
