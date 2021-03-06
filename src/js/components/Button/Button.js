import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: solid 1px white;
  display: ${({ block }) => block ? 'block' : 'inline-block'};
  text-align: ${({ block }) => block ? 'center' : 'left'};
  border-radius: 24px;
  padding: 14px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 16px;
`

const Button = ({ onClick, text, block, children }) => (
  <Wrapper block={block} onClick={onClick}>
    {children || text}
  </Wrapper>
)

export default Button
