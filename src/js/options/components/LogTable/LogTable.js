import React from 'react'

const LogTable = ({ logs }) => {
  return (
    <table>
      <tr>
        <th>Timestamp</th>
        <th>URL</th>
        <th>Reason</th>
        <th>Time</th>
      </tr>
      {logs.map((val, ind) => {
        return (
          <tr key={ind}>
            <td>{val.timestamp}</td>
            <td />
            <td>{val.reason}</td>
            <td>{val.time}</td>
          </tr>
        )
      })}
    </table>
  )
}

export default LogTable
