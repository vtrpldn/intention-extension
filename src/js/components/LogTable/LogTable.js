import React from 'react'
import styled from 'styled-components'

import { secondToClock } from '../../utils/clock'

import Button from '../Button/Button'

const Wrapper = styled.div`
  margin-bottom: 50px;
`

const Table = styled.table`
  margin-bottom: 20px;
  width: 100%;
  table-layout: fixed;
  font-size: 16px;
`

const TH = styled.th`
  font-size: 16px;
  text-align: left;
`

const TD = styled.td`
  padding: 5px 0;
`

const LogTable = ({ logs }) => {
  const clearLog = () => {
    chrome.runtime.sendMessage({ type: 'CLEAR_LOG' }, () => {
      window.location.reload()
    })
  }

  return (
    <Wrapper>
      <Table>
        <tbody>
          <tr>
            <TH>Timestamp</TH>
            <TH>URL</TH>
            <TH>Reason</TH>
            <TH>Time</TH>
          </tr>
          {logs.map((val, ind) => (
            <tr key={ind}>
              <TD>{new Date(val.timestamp * 1000).toLocaleString('en-us')}</TD>
              <TD>{val.url}</TD>
              <TD>{val.reason}</TD>
              <TD>{secondToClock(val.time)}</TD>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button block={false} onClick={() => clearLog()} text='Clear log table' />
    </Wrapper>
  )
}

export default LogTable
