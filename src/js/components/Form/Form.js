import React, { Component } from 'react'
import styled from 'styled-components'

import Radio from '../Radio/Radio'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Title from '../Title/Title'
import TimerSelector from '../TimerSelector/TimerSelector'

const Wrapper = styled.div`
  background: black;
  color: white;
  width: 100%;
  max-width: 70vw;
  height: 100vh;
  padding: 40px 50px;
`

const RadioWrapper = styled.div`
  display: flex;
`

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reason: '',
      timer: 2000,
      url: window.location.hostname
    }
  }

  changeReason (e) {
    this.setState({
      reason: e.target.value
    })
  }

  changeTimer (e) {
    console.log(e.target.value)
    this.setState({
      timer: e.target.value
    })
  }

  clickSave () {
    // prepare data object
    let data = {
      timestamp: new Date().toLocaleDateString('en-us'), // Remember to do some i18n in this later
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
          <Title text='Why do you want to use this website?' />
          <Input value={this.state.reason} onChange={(e) => this.changeReason(e)} type='text' placeholder='eg: Browse some sick memes for a while' />
          <Title text='For how long?' />
          <RadioWrapper>
            <Radio text='1 second' value='1000' name='timer' timer={this.state.timer} onChange={(e) => this.changeTimer(e)} />
            <Radio text='10 seconds' value='10000' name='timer' timer={this.state.timer} onChange={(e) => this.changeTimer(e)} />
            <Radio text='1 minute' value='60000' name='timer' timer={this.state.timer} onChange={(e) => this.changeTimer(e)} />
            <Radio text='5 minutes' value='300000' name='timer' timer={this.state.timer} onChange={(e) => this.changeTimer(e)} />
            <TimerSelector timer={this.state.timer} onChange={(e) => this.changeTimer(e)} />
          </RadioWrapper>
          <Button onClick={() => this.clickSave()} text={`Start using ${this.state.url}`} />
        </Wrapper>
      </div>
    )
  }
}

export default Form
