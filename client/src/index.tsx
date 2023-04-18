import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
