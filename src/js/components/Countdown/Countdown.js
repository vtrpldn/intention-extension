import React, { Component } from 'react'
import styled from 'styled-components'

import { secondToClock } from '../../utils/clock'

const Wrapper = styled.div`
  margin: 10px 0;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
`

class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      NOW: Math.floor(Date.now() / 1000),
      offset: 0
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        NOW: Math.floor(Date.now() / 1000)
      })
    }, 1000)
  }

  render() {
    const { NOW } = this.state
    const { url, timer, timestamp } = this.props.item
    const offset = timer - (NOW - timestamp)
    const countdown = secondToClock(offset)

    return (
      <Wrapper>
        <div>
          {url}
        </div>
        <div>
          {countdown}
        </div>
      </Wrapper>
    )
  }
}

export default Countdown