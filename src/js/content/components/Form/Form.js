import React, { Component } from 'react'

class Form extends Component {
  constructor () {
    super()
    this.state = {
        reason: '',
        timer: 0
    }
  }

  changeReason(e) {
      this.setState({
          reason: e.target.value
      })
  }

  changeTimer(e) {
      this.setState({
          timer: e.target.value
      })
  }

  clickSave() {
    // prepare data object
    let data = {
        timestamp: JSON.stringify(new Date()),
        reason: this.state.reason,
        time: this.state.timer
    }

    // write log
    chrome.runtime.sendMessage({ type: 'WRITE_LOG', data }, function () {
        console.log('write log callback')
    })

    // start timer
    chrome.runtime.sendMessage({ type: 'SET_TIMER', timer: this.state.timer }, function(response) {
      console.log('callback settimer', response)
    })

  }

  render () {
    return (
      <div>
        <div>Why do you want to use this website?</div>
        <input value={this.state.reason} onChange={(e)=>this.changeReason(e)} type='text' />
        <div>For how long?</div>
        <input value={this.state.timer} onChange={(e)=>this.changeTimer(e)} type='text' />
        <input onClick={ () => this.clickSave() } type='submit' value={`Start using ${window.location.hostname}`} />
      </div>
    )
  }
}

export default Form
