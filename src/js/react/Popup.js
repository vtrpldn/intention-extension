import React from 'react'
import ReactDOM from 'react-dom'

const Popup = () => {
  return (
    'Well, hello there, my name is Popup'
  )
}

const app = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<Popup />, app)

export default Popup
