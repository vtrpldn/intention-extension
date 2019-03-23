import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import GlobalStyle from './GlobalStyle';
import Title from './components/Title/Title'
import Button from './components/Button/Button'
import LogTable from './components/LogTable/LogTable'

class Options extends React.Component {
  constructor () {
    super()
    this.state = {
      siteList: '',
      logs: [
        {
          timestamp: 'timestamp',
          reason: 'reason',
          time: 'time'
        }
      ]
    }
  }
 
  componentDidMount () {
    chrome.storage.sync.get(['siteList', 'logs'], (items) => {
      this.setState({
        siteList: items.siteList,
        logs: items.logs
      })
    })
  }

  onChange (e) {
    this.setState({
      siteList: e.target.value
    })
  }

  saveConfig () {
    chrome.storage.sync.set({
      siteList: this.state.siteList
    }, function () {
      alert('Saved')
    })
  }

  render () {
    const Wrapper = styled.div`
      background: black;
      color: white;
      height: 100vh;
      padding: 40px 50px;
    `
    const Panel = styled.div`
      max-width: 40vw;
    `

    return (
      <Wrapper>
        <GlobalStyle />
        <Panel>
          <div>
            <Title text="Restricted sites" />
            <textarea key='sitelist' onChange={this.onChange.bind(this)} value={this.state.siteList} className='settings__field' />
          </div>
          <div>
            <Title text="Usage log" />
            <LogTable logs={this.state.logs !== undefined ? this.state.logs : []} />
          </div>
          <Button block onClick={this.saveConfig.bind(this)} text="Save all" />
        </Panel>
      </Wrapper>
    )
  }
}

const app = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<Options />, app)
