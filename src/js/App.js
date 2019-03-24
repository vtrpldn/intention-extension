import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Form from './components/Form/Form'
import styled from 'styled-components'
import GlobalStyle from './GlobalStyle';

class App extends Component {
  constructor () {
    super()
    this.state = {
      style: {
        display: 'block'
      }
    }
  }

  hideOverlay() {
    this.setState({
      style: {
        display: 'none'
      }
    })
  }

  render () {
    const Wrapper = styled.div`
      display: ${this.state.style.display};
      background: rgba(255,255,255, 0.9);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2147483647;
      transition: all 1s ease;
    `

    return (
      <div>
        <GlobalStyle />
        <Wrapper>
          <Form hideOverlay={() => this.hideOverlay()}/>
        </Wrapper>
      </div>
    )
  }
}

chrome.runtime.sendMessage({ type: 'GET_PAGE_STATUS' }, function ({
  isCurrentUrlActive,
  isCurrentUrlOnList
}) {
  console.log('isCurrentUrlActive:', isCurrentUrlActive)
  console.log('isCurrentUrlOnList:', isCurrentUrlOnList)
  if (isCurrentUrlOnList === true && isCurrentUrlActive === false) {
    const app = document.createElement('div')
    document.body.appendChild(app)
    ReactDOM.render(<App />, app)
  }
})
