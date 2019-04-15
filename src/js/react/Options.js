import React from 'react'
import ReactDOM from 'react-dom'

const Options = () => {
  return (
    'Hi, I am the Options Page'
  )
}

const app = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<Options />, app)

export default Options
