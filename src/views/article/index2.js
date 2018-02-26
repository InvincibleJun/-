import React, { Component } from "react";
import 'simplemde/dist/simplemde.min.css';
import styled from 'styled-components';
// import SimpleMDE from 'simplemde';
import MdUpLoad from '../../components/md-upload';

// const UploadContainer = styled.div`
//     width: 200px;
//     height: 120px;
//     border: 1px solid black;
//     position: absolute;
//     top: 50px;
//     z-index: 10;
// `

class Ed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      value: '123',
      uploadStatus: false
    }
  }
  componentDidMount() {
    const SimpleMDE = require('simplemde');
    const initialOptions = {
      element: document.getElementById('MyID'),
      initialValue: this.state.value,
      toolbar: ["bold", "italic", "heading", "|", "quote", "image", "|", "preview", "side-by-side", "fullscreen",
        {
          name: "custom",
          action: (editor) => {
            this.setState({ uploadStatus: true })
          },
          className: "fa fa-star",
          title: "Custom Button",
        }
      ]
    };

    const allOptions = Object.assign({}, initialOptions, this.props.options);
    let s = this.simplemde = new SimpleMDE(allOptions);
    s.codemirror.on("change", () => {
      this.setState({ value: s.value() })
    })
  }

  close = () => {
    this.setState({ uploadStatus: false })
  }

  render() {
    const { uploadStatus } = this.state
    const d = document.getElementsByClassName('fa-star')[0]
    // const t = document.getElementsByClassName('editor-toolbar')[0]
    // 确定编辑器渲染
    if (d) {
      console.log(d.offsetTop)
    }
    return (
      <div style={{ position: 'relative' }}>
        <textarea id="MyID" />
        {uploadStatus && <MdUpLoad show={uploadStatus} left={d.offsetLeft} close={this.close} ide={this.simplemde} />}
      </div>
    );
  }
}

export default Ed;
