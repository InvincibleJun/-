import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from 'draft-js-import-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Ed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/article/get').then(res => res.json()).then(data => {
      const editorState = this.toDraft(data[2].body)
      this.setState({ editorState })
    })
  }

  getHTML = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  toDraft = html => {
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    return EditorState.createWithContent(contentState);
  }

  onEditorStateChange = (editorState) => {
    debugger
    this.setState({
      editorState,
    });
  };

  add = () => {
    const { title } = this.state
    fetch('http://localhost:3000/api/article/add', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: this.getHTML(),
        title
      })
    })
  }

  changTitle = event => {
    this.setState({ title: event.target.value })
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <TextField
          hintText="Full width"
          value={this.state.title}
          onChange={this.changTitle}
          fullWidth={true}
        />
        <RaisedButton label="提交" onClick={this.add} />
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
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
              popupClassName: 'draft-wysiwyg-image-modal',
              uploadCallback: uploadImageCallBack,
              urlEnabled: false,
              alt: { present: false, mandatory: false }
            }
          }}
        />
      </div>
    );
  }
}

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/upload");
    const data = new FormData();
    data.append("file", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    // xhr.addEventListener("error", () => {
    //    const error = JSON.parse(xhr.responseText);
    //   reject(error);
    // });
  });
}

export default Ed;

