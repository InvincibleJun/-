import React, { Component } from "react";
import "simplemde/dist/simplemde.min.css";
import SimpleMDE from "simplemde";
import MdUpLoad from "../../components/md-upload";
import RaisedButton from "material-ui/RaisedButton";
import { Input } from 'antd';
import { Select } from 'antd';
import { addDraft, getOneDraft } from "../../services/draft";
import { Button } from 'antd';
const Option = Select.Option;

function getQuery(sr) {
  var match,
    urlParams = {},
    pl = /\+/g,
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    q = sr.substr(1);
  while ((match = search.exec(q)))
    urlParams[decode(match[1])] = decode(match[2]);
  return urlParams;
}

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class Ed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      value: "",
      title: "",
      _id: "",
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

    const { search } = this.props.location;
    if (search) {
      const { _id } = getQuery(search);
      getOneDraft({ _id }).then(res => {
        this.setState({ title: res.title, _id: res._id });
        s.value(res.body);
      });
    }
  }

  close = () => {
    this.setState({ uploadStatus: false });
  };

  pushDraft = () => {
    const { title, _id } = this.state;
    const body = this.simplemde.value();
    addDraft({
      _id,
      title,
      body
    }).then(res => {
      this.setState({ _id: res._id });
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
        {/* <TextField
          hintText="文章标题"
          value={title}
          onChange={this.changTitle}
          fullWidth={true}
        /> */}
        <div>
          <label>标题</label><Input style={{ width: 500 }} />
        </div>
        <div>
          <label>标签</label>
          <Select
            mode="tags"
            style={{ width: 500 }}
            tokenSeparators={[',']}
          >
            {children}
          </Select>
        </div>
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
