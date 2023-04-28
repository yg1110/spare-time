import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Date from './pages/Calendar'
import './assets/styles/globals.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Date />} />
      <Route path="/calendar" element={<Date />} />
    </Routes>
  )
}

export default App
