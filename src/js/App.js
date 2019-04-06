import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import GlobalStyle from 'GlobalStyle'

import Form from 'components/Form/Form'

const Wrapper = styled.div`
  display: ${({ display }) => display};
  background: rgba(255,255,255, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2147483647; /* NONE SHALL PASS */
  transition: all 1s ease;
`

class App extends Component {
  constructor () {
    super()
    this.state = {
      style: {
        display: 'block'
      }
    }
  }

  hideOverlay () {
    this.setState({
      style: {
        display: 'none'
      }
    })
  }

  render () {
    const { display } = this.state.style

    return (
      <div>
        <GlobalStyle />
        <Wrapper display={display}>
          <Form hideOverlay={() => this.hideOverlay()} />
        </Wrapper>
      </div>
    )
  }
}

chrome.runtime.sendMessage({ type: 'GET_PAGE_STATUS' }, ({
  isCurrentUrlActive,
  isCurrentUrlOnList
}) => {
  console.log('isCurrentUrlActive:', isCurrentUrlActive)
  console.log('isCurrentUrlOnList:', isCurrentUrlOnList)
  if (isCurrentUrlOnList === true && isCurrentUrlActive === false) {
    const app = document.createElement('div')
    document.body.appendChild(app)
    ReactDOM.render(<App />, app)
  }
})
