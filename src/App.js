import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import config from './config'

class Ed extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  push = () => {
    let html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    console.log(html)
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };


  render() {
    const { editorState } = this.state;
    return (
      <div>
        <button onClick={this.push}>提交</button>
        <Editor
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

