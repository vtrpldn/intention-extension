import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: solid 1px white;
  display: inline-block;
  border-radius: 24px;
  padding: 14px 20px;
  cursor: pointer;
`

const Button = ({onClick, text}) => {
  return (
    <Wrapper onClick={onClick}>
      {text}
    </Wrapper>
  )
}

export default Button