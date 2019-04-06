import React, { Component } from 'react'
import styled from 'styled-components'

import Label from '../Label/Label'

const TimerSelectorInput = styled.input`
  background: none;
  border: none;
  max-width: 70px;
  font-size: 16px;
  appearance: none;
  margin-right: 10px;
  border-bottom: solid 1px black;
  color: black;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    border-color: transparent;
  }
`

class TimerSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  handleClick () {
    if (this.state.active === false) {
      this.setState({
        active: true
      })
    }
  }

  handleChange (e) {
    this.props.onChange(e)
  }

  render () {
    const { active } = this.state

    return (
      <Label active={active} onClick={() => this.handleClick()}>
        {active ? (
          <div>
            <TimerSelectorInput
              autoFocus
              type='number'
              value={this.props.timer}
              onChange={(e) => this.handleChange(e)}
              onFocus={(e) => this.handleChange(e)}
            />
            seconds
          </div>
        ) : (
          'Other'
        )}
      </Label>
    )
  }
}

export default TimerSelector
