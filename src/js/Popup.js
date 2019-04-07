import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import GlobalStyle from 'GlobalStyle'

import { getUrlListStatus } from 'utils/siteCheck'
import { phrome } from 'utils/wrappers/phrome'

import Button from 'components/Button/Button'
import Countdown from 'components/Countdown/Countdown'

const Wrapper = styled.div`
  width: 300px;
  height: 400px;
  padding: 20px 25px;
  background: black;
  color: white;
`

const CountdownList = styled.div`
  margin-bottom: 15px;
  border-bottom: solid 1px white;
`

class Popup extends React.Component {
  constructor () {
    super()
    this.state = {
      currentActiveUrl: '',
      isCurrentUrlListed: null,
      activeSites: []
    }
  }

  async componentDidMount () {
    const currentActiveUrl = await phrome.tabs.getCurrentUrl()
    const { siteList, activeSites } = await phrome.storage.get(['siteList', 'activeSites'])

    __DEV__ && console.log('componentDidMount activeSites:', activeSites)

    this.setState({
      currentActiveUrl,
      isCurrentUrlListed: getUrlListStatus(siteList, currentActiveUrl),
      activeSites
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
        
        __DEV__ && console.log('TABS:', tabs)

        chrome.tabs.update(tabs[0].id, { url: tabs[0].url })
        window.close()
      })
    })
  }

  render () {
    const { activeSites, isCurrentUrlListed } = this.state

    return (
      <Wrapper>
        <GlobalStyle />

        {activeSites.length > 0 && (
          <CountdownList>
            {activeSites.map((val, ind) => <Countdown key={ind} item={val} />)}
          </CountdownList>
        )}

        <Button
          block
          text={isCurrentUrlListed ? 'Remove this site from list' : 'Add this site to list'}
          onClick={() => this.toggleCurrentToList()}
        />
      </Wrapper>
    )
  }
}

const app = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<Popup />, app)
