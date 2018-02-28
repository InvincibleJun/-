import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import draftToMarkdown from "draftjs-to-markdown";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import styled from "styled-components";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

// var converter = require("html-to-markdown");

class Ed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: ""
    };
  }

  componentDidMount() {
    // fetch("http://localhost:3000/api/article/get")
    //   .then(res => res.json())
    //   .then(data => {
    //     const editorState = this.toDraft(data[2].body);
    //     this.setState({ editorState });
    //   });
  }

  getHTML = () => {
    return draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
  };

  getMarkDown = () => {
    const rawContentState = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    return draftToMarkdown(rawContentState);
  };

  toDraft = html => {
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    return EditorState.createWithContent(contentState);
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  add = isHTML => {
    const body = isHTML ? this.getHTML() : this.getMarkDown();
    const { title } = this.state;
    // return;
    fetch("http://localhost:3000/api/draft/add", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body: this.getHTML(),
        title
      })
    });
  };

  changTitle = event => {
    this.setState({ title: event.target.value });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <CardHeader title="发表页面" />
        <TextField
          hintText="文章标题"
          value={this.state.title}
          onChange={this.changTitle}
          fullWidth={true}
        />
        <Editor
          editorState={editorState}
          wrapperClassName="editor-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            alignmentEnabled: false,
            urlEnabled: false,
            image: {
              popupClassName: "draft-wysiwyg-image-modal",
              uploadCallback: uploadImageCallBack,
              urlEnabled: false,
              alt: { present: false, mandatory: false }
            }
          }}
        />
        <RaisedButton
          label="存为html"
          onClick={() => this.add(true)}
          style={{ marginRight: 20 }}
        />
        <RaisedButton label="存为markdonw" onClick={() => this.add(false)} />
      </div>
    );
  }
}

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:10086/api/draft/upload");
    const data = new FormData();
    data.append("file", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response.data.pathname);
    });
    // xhr.addEventListener("error", () => {
    //    const error = JSON.parse(xhr.responseText);
    //   reject(error);
    // });
  });
}

export default Ed;
