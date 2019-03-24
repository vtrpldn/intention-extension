import React from 'react'
import styled from 'styled-components'

const Button = ({onClick, text, block}) => {

  const Wrapper = styled.div`
    border: solid 1px white;
    display: ${block ? 'block' : 'inline-block'};
    text-align: ${block ? 'center' : 'left'};
    border-radius: 24px;
    padding: 14px 20px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 16px;
  `
  return (
    <Wrapper onClick={onClick}>
      {text}
    </Wrapper>
  )
}

export default Button