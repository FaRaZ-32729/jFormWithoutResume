import React from 'react'
import SubmissionSummary from './components/SubmitionSummary'
import { Route, Router, Routes } from 'react-router'
import FinalForm from './components/FinalForm'
import Preview from './components/Preview'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
    <ToastContainer position='top-right' autoClose={1500} />

      <Routes>
        <Route path='/' element={<FinalForm />} />
        <Route path='/preview' element={<Preview />} />
        <Route path='/submitted' element={<SubmissionSummary />} />
      </Routes>
    </>
  )
}

export default App