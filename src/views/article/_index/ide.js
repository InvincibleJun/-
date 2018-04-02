import React, { Component } from "react";
import "../../../assets/css/font-awesome.min.css"
import "simplemde/dist/simplemde.min.css";
import SimpleMDE from "simplemde";
import MdUpLoad from "../../../components/md-upload";

class Ide extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.simplemde.value()) {
      this.simplemde.value(nextProps.value)
    }
  };

  componentDidMount() {
    const { value, update } = this.props
    const initialOptions = {
      autoDownloadFontAwesome: false,
      element: document.getElementById("MyID"),
      initialValue: value,
      toolbar: [
        "bold",
        "italic",
        "heading-1",
        "heading-2",
        "heading-3",
        "|",
        "table",
        "horizontal-rule",
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
            // let code = this.simplemde.codemirror;
            // let start = code.getCursor("start");
            // // let end = code.getCursor("end");
            // code.replaceRange('\naaa', start);
            this.refs.uploadImage.start()
          },
          className: "fa fa-star",
          title: "Custom Button"
        }
      ]
    }

    const allOptions = Object.assign({}, initialOptions, this.props.options);
    let s = this.simplemde = new SimpleMDE(allOptions);
    s.codemirror.on("change", () => {
      update(s.value())
    });
  }


  render() {
    return (
      <div>
        <textarea id="MyID" />
        <MdUpLoad 
          ref="uploadImage"
          ide={this.simplemde}
        />
      </div>
    )
  }
}

export default Ide;