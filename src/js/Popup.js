import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { getUrlListStatus } from './utils/siteCheck'

import GlobalStyle from './GlobalStyle'
import Button from './components/Button/Button'

const Wrapper = styled.div`
  width: 300px;
  height: 400px;
  padding: 20px 25px;
  background: black;
  color: white;
`

class Popup extends React.Component {
  constructor () {
    super()
    this.state = {
      currentActiveUrl: '',
      isCurrentUrlListed: null
    }
  }

  componentDidMount () {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      let currentActiveUrl = new URL(tabs[0].url).hostname

      this.setState({
        currentActiveUrl
      })

      chrome.storage.sync.get({
        siteList: []
      }, (items) => {
        this.setState({
          isCurrentUrlListed: getUrlListStatus(items.siteList, currentActiveUrl)
        })
      })
    })
  }

  toggleCurrentToList () {
    chrome.runtime.sendMessage({
      type: 'TOGGLE_CURRENT_SITE',
      currentActiveUrl: this.state.currentActiveUrl,
      isCurrentUrlListed: this.state.isCurrentUrlListed
    }, () => {
      // Refactor this to include into state
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url })
        window.close()
      })
    })
  }

  // DEBUG OPTION
  clearActive () {
    alert('Clearing Active List')
    chrome.storage.sync.set({
      activeList: []
    }, () => {
      console.log('activeList cleared')
    })
  }

  render () {
    return (
      <Wrapper>
        <GlobalStyle />
        <Button
          block
          text={this.state.isCurrentUrlListed ? 'Remove this site from list' : 'Add this site to list'}
          onClick={() => this.toggleCurrentToList()}
        />
        <Button
          block
          text='Clear active sites'
          onClick={() => this.clearActive()}
        />
      </Wrapper>
    )
  }
}

const app = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<Popup />, app)
