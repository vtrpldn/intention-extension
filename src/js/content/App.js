import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Form from './components/Form/Form'
import styled from 'styled-components'

class App extends Component {
  constructor () {
    super()
    this.state = {
      display: 'block'
    }
  }

  hideOverlay() {
    this.setState({
      display: 'none'
    })
  }

  render () {
    const Wrapper = styled.div`
      display: ${this.state.display};
      background: white;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2147483647;
    `

    return (
      <Wrapper>
        <Form hideOverlay={this.hideOverlay.bind(this)}/>
      </Wrapper>
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
