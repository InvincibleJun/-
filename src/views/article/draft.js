import React, { Component } from 'react';
import { getDraft } from '../../services/api';
import Item from 'antd/lib/list/Item';

class Draft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  async componentWillMount() {
    const data = await getDraft()
    this.setState({ data })
  }
  render() {
    const { data } = this.state
    return (
      <div>
        {data.map(item => <div key={item._id}>
          <div>{item.title}</div>
          <div>{item.createTime}</div>
        </div>)}
      </div>
    )
  }
}

export default Draft;