import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
  background: ${({ active }) => active ? 'white' : 'black'};
  color: ${({ active }) => active ? 'black' : 'white'};
  cursor: pointer;
  border: solid 1px white;
  display: ${({ block }) => block ? 'block' : 'inline-block'};
  text-align: ${({ block }) => block ? 'center' : 'left'};
  border-radius: 24px;
  padding: 14px 20px;
  font-size: 16px;
  margin-bottom: 16px;
  margin-right: 8px;
  transition: all .3s ease;
`

export default Label
