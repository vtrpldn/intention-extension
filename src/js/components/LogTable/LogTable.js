import React from 'react'
import styled from 'styled-components'

import Button from '../Button/Button'

const LogTable = ({ logs }) => {
  const Wrapper = styled.div`
    margin-bottom: 50px;
  `

  return (
    <Wrapper>
      <table>
        <tr>
          <th>Timestamp</th>
          <th>URL</th>
          <th>Reason</th>
          <th>Time</th>
        </tr>
        {logs.map((val, ind) => (
          <tr key={ind}>
            <td>{val.timestamp}</td>
            <td>{val.url}</td>
            <td>{val.reason}</td>
            <td>{val.time}</td>
          </tr>
        ))}
      </table>
      <Button onClick={() => alert('Cleared! Just kidding, this hasn\'t been implemented yet')} text="Clear log table" />
    </Wrapper>
  )
}

export default LogTable
