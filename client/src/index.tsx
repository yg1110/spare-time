import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
