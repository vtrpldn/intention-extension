import styled from 'styled-components'

const Input = styled.input`
  background: black;
  border: none;
  border-bottom: solid 1px white;
  color: white;
  padding: 10px 0;
  margin-bottom: 32px;
  width: 100%;
  font-size: 18px;
  &::-webkit-input-placeholder {
    color: #666;
    font-style: italic;
  }
`

export default Input