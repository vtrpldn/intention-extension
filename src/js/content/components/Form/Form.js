import React, { Component } from 'react'

class Form extends Component {
  constructor () {
    super()
    this.state = {
        reason: '',
        time: 0
    }
  }

  changeReason(e) {
      this.setState({
          reason: e.target.value
      })
  }

  changeTime(e) {
      this.setState({
          time: e.target.value
      })
  }

  clickSave() {
    // prepare data object
    let data = {
        timestamp: JSON.stringify(new Date()),
        reason: this.state.reason,
        time: this.state.time
    }

    // write log
    chrome.runtime.sendMessage({ type: 'WRITE_LOG', data }, function () {
        console.log('write log callback')
    })

    // start timer
    setTimeout( () => {
        chrome.runtime.sendMessage({ type: 'CLOSE_TAB' }, function (response) {
            console.log('close tab', response)
        })
    }, this.state.time)

    // hide overlay ...
  }

  render () {
    return (
      <div>
        <div>Why do you want to use this website?</div>
        <input value={this.state.reason} onChange={(e)=>this.changeReason(e)} type='text' />
        <div>For how long?</div>
        <input value={this.state.time} onChange={(e)=>this.changeTime(e)} type='number' />
        <input onClick={ () => this.clickSave() } type='submit' value={`Start using ${window.location.hostname}`} />
      </div>
    )
  }
}

export default Form
