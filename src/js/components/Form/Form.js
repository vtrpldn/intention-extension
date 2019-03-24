import React, { Component } from 'react'
import styled from 'styled-components'

import Input from '../Input/Input'
import Button from '../Button/Button'
import Title from '../Title/Title'

const Wrapper = styled.div`
  background: black;
  color: white;
  width: 100%;
  max-width: 40vw;
  height: 100vh;
  padding: 40px 50px;
`

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reason: '',
      timer: 0,
      url: window.location.hostname
    }
  }

  changeReason (e) {
    this.setState({
      reason: e.target.value
    })
  }

  changeTimer (e) {
    this.setState({
      timer: e.target.value
    })
  }

  clickSave () {
    // prepare data object
    let data = {
      timestamp: new Date().toLocaleDateString('en-us'),
      url: this.state.url,
      reason: this.state.reason,
      time: this.state.timer
    }

    // write log
    chrome.runtime.sendMessage({ type: 'WRITE_LOG', data })

    // start timer
    chrome.runtime.sendMessage({ type: 'SET_TIMER', timer: this.state.timer })

    // hide overlay
    this.props.hideOverlay()
  }

  render () {
    return (
      <div>
        <Wrapper>
          <Title text="Why do you want to use this website?" />
          <Input value={this.state.reason} onChange={(e) => this.changeReason(e)} type='text' placeholder="eg: Browse some sick memes for a while"/>
          <Title text="For how long?" />
          <Input value={this.state.timer} onChange={(e) => this.changeTimer(e)} type='number'/>
          <Button onClick={() => this.clickSave()} text={`Start using ${this.state.url}`} />
        </Wrapper>
      </div>
    )
  }
}

export default Form
