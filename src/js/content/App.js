import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Form from './components/Form/Form'
import styled from 'styled-components'

class App extends Component {

  render () {

    const Wrapper = styled.div`
      background: rgba(255,255,255,0.9);
      height: 100vh;
      width: 100vw;
      position: fixed;
    `

    return (
      <Wrapper>
        <Form />
      </Wrapper>
    )
  }
}

chrome.runtime.sendMessage({ type: 'GET_PAGE_STATUS' }, function (response) {
  if (response === true) {
    const app = document.createElement('div')
    document.body.appendChild(app)
    ReactDOM.render(<App />, app)
  }
})
