/********************************
 * desc: 给md编辑器添加上传功能
*********************************/

import React, { Component } from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div`
    width: 200px;
    height: 220px;
    border: 1px solid black;
    position: absolute;
    top: 50px;
    z-index: 10;
`

class MdUpload extends Component {

  upLoadImage = event => {
    const file = this.refs.uploadInput.files[0]
    if (!file) return
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:10086/api/draft/upload");
    const data = new FormData();
    data.append("file", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const res = JSON.parse(xhr.responseText);
      if (res.success) {
        let fileName = "http://localhost:10086/uploads/" + res.data.filename
        this.addImgToIDE(fileName)
      }
    });
    // xhr.addEventListener("error", () => {
    //    const error = JSON.parse(xhr.responseText);
    //   reject(error);
    // });
  }

  addImgToIDE = fileName => {
    const { ide, close } = this.props
    let alt = this.refs.uploadAlt.value.trim()
    let nV = ide.value() + `![${alt}](${fileName})`
    ide.value(nV)
    close()
  }

  render() {
    const { left, show, close } = this.props
    return (
      <div>
        {
          show &&
          <UploadContainer style={{ marginLeft: left }}>
            <p>upload</p>
            <input type="file" name="file" ref="uploadInput" />
            <label>Alt:</label><input ref="uploadAlt" placeholder="Alt" />
            <label>width(px):</label><input ref="uploadAlt" placeholder="auto" />
            <label>height(px):</label><input ref="uploadAlt" placeholder="auto" />
            <button onClick={this.upLoadImage}>上传</button>
            <button onClick={close}>关闭</button>
          </UploadContainer>
        }
      </div>
    )
  }
}

export default MdUpload