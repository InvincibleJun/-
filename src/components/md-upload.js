/********************************
 * desc: 给md编辑器添加上传功能
*********************************/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Input, Upload, Icon } from 'antd'
import { uploadImage } from '../services/draft'
import Modal from './modal'

const UploadContainer = styled.div`
  padding-bottom: 20px;
`
const Wrapper = styled.div`
  label{
    width: 60px;
    font-weight: bold;
    display: inline-block;
  }
  input {
    width: 200px;
  }
  h3 {
    border-bottom: 1px solid #ccc;
    line-height: 40px;
    padding: 0 20px;
    font-weight: bold;
  }
`
const Item = styled.div`
  margin: 15px;
`

class MdUpload extends Component {
  propTypes = {
    ide: PropTypes.object
  }

  state = {
    show: false,
    loading: false,
    fileList: [],
    form: {
      width: undefined,
      height: undefined,
      alt: undefined
    }
  }

  push = event => {
    const file = this.state.fileList[0]
    if (!file) return
    this.setState({ loading: true })
    const data = new FormData()
    data.append('file', file)
    uploadImage(data).then(fileName => {
      this.addImgToIDE(fileName)
    })
  }

  start = editor => {
    this.setState({ show: true })
  }

  close = () => {
    this.setState({
      show: false,
      loading: false,
      fileList: [],
      form: {
        width: undefined,
        height: undefined,
        alt: undefined
      }
    })
  }

  addImgToIDE = fileName => {
    const { ide } = this.props
    const { width = '100%', height = '100%', alt = '' } = this.state.form
    let code = ide.codemirror
    let start = code.getCursor('start')
    code.replaceRange(`<img src="${fileName}" width="${width}" height="${height}" alt="${alt}"/>`, start)
    this.close()
  }

  changeValue (e, target) {
    let val = e.target.value
    const { form } = this.state
    this.setState({ form: { ...form, [target]: val } })
  }

  render () {
    const { show, fileList, loading, form } = this.state

    const props = {
      action: '/',
      fileList,
      beforeUpload: file => {
        return false
      },
      onChange: ({ file, fileList }) => {
        this.setState({ fileList: [file] })
      }
    }

    return (
      <Wrapper>
        <Modal show={show}>
          <UploadContainer>
            <h3>上传图片</h3>
            <Upload style={{ marginLeft: 70 }} {...props} name='file' ref='uploadInput'>
              <Button>
                <Icon type='upload' /> 选择上传的图片
              </Button>
            </Upload>
            <Item>
              <label>Alt</label><Input placeholder='默认为空' value={form.alt} onChange={e => this.changeValue(e, 'alt')} />
            </Item>
            <Item>
              <label>Width</label><Input placeholder='默认100%' value={form.width} onChange={e => this.changeValue(e, 'width')} />
            </Item>
            <Item>
              <label>Height</label><Input placeholder='默认100%' value={form.height} onChange={e => this.changeValue(e, 'height')} />
            </Item>
            <Button onClick={this.push} loading={loading} style={{ marginLeft: 80 }}>上传</Button>
            <Button onClick={this.close} style={{ marginLeft: 20 }}>关闭</Button>
          </UploadContainer>
        </Modal>
      </Wrapper>
    )
  }
}

export default MdUpload
