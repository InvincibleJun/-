import React, { Component } from "react";
import 'simplemde/dist/simplemde.min.css'
// import SimpleMDE from 'simplemde';
class Ed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      value: '123'
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
            console.log(this.state.value)
            // this.simplemde.value('11')
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

  handlerChange = event => {
    this.setState({ value: event.target.value });
  }

  upLoadImage = event => {
    const file = event.target.files[0]
    console.log(file)
    debugger
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:10086/api/draft/upload");
    const data = new FormData();
    data.append("file", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      // const response = JSON.parse(xhr.responseText);
    });
    // xhr.addEventListener("error", () => {
    //    const error = JSON.parse(xhr.responseText);
    //   reject(error);
    // });
  }

  render() {
    return (
      <div>
        <textarea id="MyID" />
        <div style={{ width: 100, height: 100, border: '1px solid black' }}>
          <p>upload</p>
          <input type="file" name="file" onChange={this.upLoadImage} />
        </div>
      </div>
    );
  }
}

function uploadImageCallBack(file) {


}

export default Ed;
