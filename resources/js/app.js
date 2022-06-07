import React from 'react'
import ReactDOM from 'react-dom'
import Companies from './pages/Companies'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CompaniesAdd from './pages/CompaniesAdd'
require('./bootstrap')

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/companies/edit/:id" element={<CompaniesAdd />} />
        <Route path="/companies/add" element={<CompaniesAdd />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/" element={<Navigate to="/companies" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
