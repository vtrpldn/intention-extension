import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { getUrlListStatus } from './utils/siteCheck'
import { phrome } from './utils/wrappers/phrome'

import GlobalStyle from './GlobalStyle'
import Button from './components/Button/Button'
import Title from './components/Title/Title'

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
      isCurrentUrlListed: null,
      activeSites: []
    }
  }

  async componentDidMount () {
    const currentActiveUrl = await phrome.tabs.getCurrentUrl()
    const { siteList, activeSites } = await phrome.storage.get(['siteList', 'activeSites'])

    console.log('componentDidMount activeSites:', activeSites)

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
        console.log('TABS:', tabs)

        chrome.tabs.update(tabs[0].id, { url: tabs[0].url })
        window.close()
      })
    })
  }

  render () {
    const { activeSites, isCurrentUrlListed } = this.state

    console.log('activeSites:', activeSites)

    return (
      <Wrapper>
        <GlobalStyle />
        {activeSites.length > 0 ? (
          <div>
            <Title text='Active timers:' />
            {activeSites.map((val, ind) => <Title key={ind} text={val.url} />)}
          </div>
        ) : (
          ''
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
