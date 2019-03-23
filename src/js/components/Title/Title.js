import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
`

const Title = ({text}) => {
  return (
    <Wrapper>
      {text}
    </Wrapper>
  )
}

export default Title