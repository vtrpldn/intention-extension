import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
    'Hi, my name is app'
  )
}

const app = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<App />, app)

export default App
