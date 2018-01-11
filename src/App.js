import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class App extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <form
          type="multipart/form-data"
          action="http://localhost:3000/upload"
          method="POST"
        >
          <input type="file" name="f" />
          <input type="submit" />
        </form>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true }
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
    xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=ABCD");
    const data = new FormData();
    data.append("image", file);
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

export default App;
