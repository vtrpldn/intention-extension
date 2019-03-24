import React from 'react'
import styled from 'styled-components'

const Radio = ({name, value, timer, text, onChange, block}) => {

  const isActive = timer == value
  
  const Label = styled.label`
    background: ${isActive ? 'white' : 'black'};
    color: ${isActive ? 'black' : 'white'};
    cursor: pointer;
    border: solid 1px white;
    display: ${block ? 'block' : 'inline-block'};
    text-align: ${block ? 'center' : 'left'};
    border-radius: 24px;
    padding: 14px 20px;
    font-size: 16px;
    margin-bottom: 16px;
    margin-right: 8px;
    transition: all 3s ease;
  `

  const Input = styled.input`
    display: none;
  `

  return (
    <Label>
      <Input
        type="radio"
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