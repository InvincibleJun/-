import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ccc;
`

const map = {
  '-1': '未保存',
  '0': '保存中...',
  '1': '已保存'
}

export default class extends Component {
  state = {}

  static propTypes = {
    // -1 未保存， 0 // 保存中  1 // 已保存
    status: PropTypes.number.isRequired
  }

  makeMessage = status => {
    if (status === 0) {
      return [<i className="" />, '未保存']
    } else if (status === 1) {
      return [<i className="" />, '']
    }
  }

  render() {
    const { status } = this.props
    return <Container>{map[status]}</Container>
  }
}
