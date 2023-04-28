import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Nav from './component/Nav'
import { RecoilRoot } from 'recoil'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
        <Nav />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
)
