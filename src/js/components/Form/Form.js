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
  max-width: 50vw;
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
      timer: 300,
      url: window.location.hostname,
      
    }
  }

  changeReason (e) {
    this.setState({
      reason: e.target.value
    })
  }

  changeTimer (e) {

    if (__DEV__) {
      console.log(e.target.value)
    }

    this.setState({
      timer: e.target.value
    })
  }

  clickSave () {

    if (this.state.reason === '') {
      alert('Please, specify the reason for browsing this website.')
      return
    }

    const NOW = Math.floor(Date.now() / 1000)

    // prepare log object
    let data = {
      timestamp: NOW,
      url: this.state.url,
      reason: this.state.reason,
      time: this.state.timer
    }

    // write log
    chrome.runtime.sendMessage({ type: 'WRITE_LOG', data })

    // start timer
    chrome.runtime.sendMessage({
      type: 'SET_TIMER',
      data: {
        timestamp: NOW,
        timer: this.state.timer
      }
    })

    // hide overlay
    this.props.hideOverlay()
  }

  // MAKE DIS SHIT MANDATORY v

  render () {
    const {timer, reason, url} = this.state 

    return (
      <div>
        <Wrapper>
          <Title text='Why do you want to use this website?' />
          <Input value={reason} onChange={(e) => this.changeReason(e)} type='text' placeholder='eg: Read the news for a while...' />
          <Title text='For how long?' />
          <RadioWrapper>
            <Radio text='5 minutes' value='5' name='timer' timer={timer} onChange={(e) => this.changeTimer(e)} />
            <Radio text='15 minutes' value='15' name='timer' timer={timer} onChange={(e) => this.changeTimer(e)} />
            <TimerSelector timer={timer} onChange={(e) => this.changeTimer(e)} />
          </RadioWrapper>
          <Button onClick={() => this.clickSave()} text={`Start using ${url}`} />
        </Wrapper>
      </div>
    )
  }
}

export default Form
