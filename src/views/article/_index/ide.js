import React, { Component } from "react";
import "simplemde/dist/simplemde.min.css";
import SimpleMDE from "simplemde";
import MdUpLoad from "../../../components/md-upload";

class Ide extends Component {
  state = {
    uploadStatus: false
  }
  // 防止循环
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.simplemde.value()){
      this.simplemde.value(nextProps.value)
    }
  };
  componentDidMount() {
    const { value, update } = this.props
    const initialOptions = {
      element: document.getElementById("MyID"),
      initialValue: value,
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
    }

    const allOptions = Object.assign({}, initialOptions, this.props.options);
    let s = (this.simplemde = new SimpleMDE(allOptions));
    s.codemirror.on("change", () => {
      update(s.value())
    });
  }

  close = () => {
    this.setState({ uploadStatus: false });
  };

  render() {
    const { uploadStatus } = this.state;
    const d = document.getElementsByClassName("fa-star")[0];
    return (
      <div style={{ position: "relative" }}>
        <textarea id="MyID" />
        {uploadStatus && (
          <MdUpLoad
            show={uploadStatus}
            left={d.offsetLeft}
            close={this.close}
            ide={this.simplemde}
          />
        )}
      </div>
    )
  }
}

export default Ide;