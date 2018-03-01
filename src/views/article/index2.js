import React, { Component } from "react";
import "simplemde/dist/simplemde.min.css";
import styled from "styled-components";
import SimpleMDE from "simplemde";
import MdUpLoad from "../../components/md-upload";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import { addDraft } from "../../services/draft";
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
    super(props);
    this.state = {
      file: "",
      value: "",
      title: "",
      uploadStatus: false
    };
  }
  componentDidMount() {
    const initialOptions = {
      element: document.getElementById("MyID"),
      initialValue: this.state.value,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "link",
        "quote",
        "image",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
        {
          name: "custom",
          action: editor => {
            this.setState({ uploadStatus: true });
          },
          className: "fa fa-star",
          title: "Custom Button"
        }
      ]
    };

    const allOptions = Object.assign({}, initialOptions, this.props.options);
    let s = (this.simplemde = new SimpleMDE(allOptions));
    s.codemirror.on("change", () => {
      this.setState({ value: s.value() });
    });
  }

  close = () => {
    this.setState({ uploadStatus: false });
  };

  pushDraft = () => {
    const { title } = this.state;
    const body = this.simplemde.value();
    addDraft({
      title,
      body
    }).then(res => {
      console.log("success");
    });
  };

  clearDraft = () => {
    this.simplemde.value("");
  };
  changTitle = e => {
    this.setState({ title: e.target.value });
  };
  render() {
    const { uploadStatus, title } = this.state;
    const d = document.getElementsByClassName("fa-star")[0];
    // const t = document.getElementsByClassName('editor-toolbar')[0]
    // 确定编辑器渲染
    if (d) {
      // console.log(d.offsetTop);
    }
    return (
      <div style={{ position: "relative" }}>
        <TextField
          hintText="文章标题"
          value={title}
          onChange={this.changTitle}
          fullWidth={true}
        />
        <textarea id="MyID" />
        {uploadStatus && (
          <MdUpLoad
            show={uploadStatus}
            left={d.offsetLeft}
            close={this.close}
            ide={this.simplemde}
          />
        )}
        <RaisedButton onClick={this.pushDraft}>添加草稿</RaisedButton>
        <RaisedButton onClick={this.clearDraft}>清空</RaisedButton>
      </div>
    );
  }
}

export default Ed;
