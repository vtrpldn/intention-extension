import React from 'react'
import styled from 'styled-components'

import Button from '../Button/Button'

const LogTable = ({ logs }) => {
  const Wrapper = styled.div`
    margin-bottom: 50px;
  `

  const Table = styled.table`
    margin-bottom: 20px;
  `

  const clearLog = () => {
    chrome.runtime.sendMessage({ type: 'CLEAR_LOG' }, () => {
      window.location.reload()
      alert('Cleared!')
    })
  }

  return (
    <Wrapper>
      <Table>
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
      </Table>
      <Button onClick={() => clearLog()} text='Clear log table' />
    </Wrapper>
  )
}

export default LogTable
