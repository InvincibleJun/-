import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #404040;
  color: #fff;
  width: 200px;
  height: 100vh;
`
const Menu = styled.div`
  line-height: 40px;
  padding-left: 40px;
  font-size: 16px;
  background-color: ${props => (props.active ? '#666' : '')};
  box-sizing: border-box;
  &:hover {
    background-color: #666;
  }
`
const Logo = styled.div`
  margin: 20px 50px;
  background-color: #fff;
  width: 100px;
  height: 40px;
`
const MenuContainer = styled.div`
  position: relative;
`

const Chunk = styled.div`
  left: 0;
  top: ${props => props.active * 40 + 'px'};
  width: 6px;
  position: absolute;
  height: 40px;
  background-color: #66cd00;
`

export default class LeftMenu extends Component {
  static propTypes = {
    config: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    to: PropTypes.func.isRequired
  }

  state = {
    active: 0
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { config, path } = nextProps
    for (let i = 0, l = config.length; i < l; i++) {
      if (config[i].path === path) {
        this.setState({
          active: i
        })
      }
    }
  }

  render() {
    const { config, path, to } = this.props
    const { active } = this.state

    return (
      <Container>
        <Logo />
        <MenuContainer>
          <Chunk active={active} />
          {config.map((val, key) => (
            <Menu
              key={key}
              active={val.path === path}
              onClick={() => to(val.path)}
            >
              {val.name}
              {/* {val.child && val.child.map((child, key) => <MenuItem />)} */}
            </Menu>
          ))}
        </MenuContainer>
      </Container>
    )
  }
}
