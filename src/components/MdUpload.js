/********************************
 * desc: 给md编辑器添加上传功能
 *********************************/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'
import { uploadImage } from '../services/article'
import Modal from './Modal'

const UploadContainer = styled.div`
  padding-bottom: 20px;
`
const Wrapper = styled.div`
  label {
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

const VisibleFileInput = styled.input`
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  opacity: 0;
`

const WatchImage = styled.div`
  img {
    display: block;
    margin: 20px auto;
    border: 1px dashed #ccc;
  }
`

class MdUpload extends Component {
  static propTypes = {
    ide: PropTypes.object
  }

  state = {
    show: false,
    loading: false,
    file: null,
    src: ''
  }

  push = event => {
    const { file } = this.state
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
      file: null,
      src: ''
    })
  }

  addImgToIDE = fileName => {
    const { ide } = this.props
    let code = ide.codemirror
    let start = code.getCursor('start')
    code.replaceRange(`<img src="${fileName}" />\r\n`, start)
    this.close()
  }

  changeValue(e, target) {
    let val = e.target.value
    const { form } = this.state
    this.setState({ form: { ...form, [target]: val } })
  }

  handlerFileChange(e) {
    const file = e.target.files[0]
    this.setState({
      file
    })
    const reader = new FileReader()
    reader.readAsDataURL(file)
    // var vm = this
    reader.onload = e => {
      let base64String = e.target.result
      this.setState({ src: base64String })
    }
  }

  render() {
    const { show, src } = this.state

    return (
      <Wrapper>
        <Modal show={show}>
          <UploadContainer>
            <h3>
              上传图片
              {/*  */}
            </h3>
            <RaisedButton
              label="选择上传图片"
              labelPosition="before"
              style={{
                margin: 12
              }}
              containerElement="label"
            >
              <VisibleFileInput
                onChange={e => {
                  this.handlerFileChange(e)
                }}
                type="file"
              />
            </RaisedButton>
            <WatchImage>
              {src && <img src={src} width="200" alt="" />}
            </WatchImage>
            {/* <h3>上传图片</h3>
            <Upload
              style={{ marginLeft: 70 }}
              {...props}
              name="file"
              ref="uploadInput"
            >
              <Button>
                <Icon type="upload" /> 选择上传的图片
              </Button>
            </Upload>
            <Item>
              <label>Alt</label>
              <Input
                placeholder="默认为空"
                value={form.alt}
                onChange={e => this.changeValue(e, 'alt')}
              />
            </Item>
            <Item>
              <label>Width</label>
              <Input
                placeholder="默认100%"
                value={form.width}
                onChange={e => this.changeValue(e, 'width')}
              />
            </Item>
            <Item>
              <label>Height</label>
              <Input
                placeholder="默认100%"
                value={form.height}
                onChange={e => this.changeValue(e, 'height')}
              />
            </Item> */}
            <div style={{ textAlign: 'center' }}>
              <RaisedButton
                label="上传"
                onClick={this.push}
                style={{ marginRight: 20 }}
              />
              <RaisedButton onClick={this.close} label="关闭" />
            </div>

            {/* <Button
              onClick={this.push}
              loading={loading}
              style={{ marginLeft: 80 }}
            >
              上传
            </Button>
            <Button onClick={this.close} style={{ marginLeft: 20 }}>
              关闭
            </Button> */}
          </UploadContainer>
        </Modal>
      </Wrapper>
    )
  }
}

export default MdUpload
