import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import GlobalStyle from 'GlobalStyle'

import Title from 'components/Title/Title'
import Button from 'components/Button/Button'
import LogTable from 'components/LogTable/LogTable'

const Wrapper = styled.div`
  background: black;
  color: white;
  padding: 40px 50px;
  min-height: 100vh;
`

const Panel = styled.div`
`

const Textarea = styled.textarea`
  background: none;
  border: none;
  border-left: solid 1px white;
  font-style: italic;
  padding: 10px;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
  resize: none;
`
class Options extends React.Component {
  constructor() {
    super()
    this.state = {
      siteList: '',
      logs: []
    }
  }

  componentDidMount() {
    chrome.storage.sync.get({
      siteList: [],
      logs: []
    }, (items) => {
      this.setState({
        siteList: items.siteList.join('\n'),
        logs: items.logs
      })
    })
  }

  onChange(e) {
    this.setState({
      siteList: e.target.value
    })
  }

  saveConfig() {
    chrome.storage.sync.set({
      siteList: this.state.siteList.trim().split('\n')
    }, function () {
      alert('Saved!')
    })
  }

  render() {

    const { logs, siteList } = this.state

    console.log('DEBUG: Current Logs:', logs)

    return (
      <Wrapper>
        <GlobalStyle />
        <Panel>

          <Title text='Restricted sites' />
          <Textarea onChange={(e) => this.onChange(e)} value={siteList} />
          <Button onClick={this.saveConfig.bind(this)} text='Save all' />

          {logs.length > 0 && (
            <div>
              <Title text='Usage log' />
              <LogTable logs={logs} />
            </div>
          )}
        </Panel>
      </Wrapper>
    )
  }
}

const app = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<Options />, app)
