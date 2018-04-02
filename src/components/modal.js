import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left:0;
  z-index:10000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  animation: .5s ${fadeIn} ease-out;
`
const Main = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: ${prop => prop.width};
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`



class Modal extends Component {
  // com
  componentWillReceiveProps(newProps, oldProps) {
    if (!newProps) {
    }
  }
  
  render() {
    const { children, show } = this.props
    return (
      <div>
        {show &&
          <Container>
            <Main width="300px">{children}</Main>
          </Container>
        }

      </div>
    )
  }
}

export default Modal;