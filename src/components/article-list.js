import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  width: 200px;
  height: 100vh;
`

const Article = styled.div``

const ArticleTitle = styled.div``

const ActicleTime = styled.div``

export default class extends Component {
  state = {}
  static propTypes = {
    list: PropTypes.array.isRequired
  }

  render() {
    const { list } = this.props

    return (
      <Container>
        {list.map((val, key) => (
          <Article>
            <ArticleTitle />
            <ActicleTime />
          </Article>
        ))}
      </Container>
    )
  }
}
