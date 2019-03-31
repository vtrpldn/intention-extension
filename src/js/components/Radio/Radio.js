import React from 'react'
import styled from 'styled-components'

import Label from '../Label/Label'

const Input = styled.input`
  display: none;
`

const Radio = ({ name, value, timer, text, onChange }) => {
  const isActive = timer == value

  return (
    <Label active={isActive}>
      <Input
        type='radio'
        name={name}
        value={value}
        checked={isActive}
        onChange={(e) => onChange(e)}
      />
      {text}
    </Label>
  )
}

export default Radio
