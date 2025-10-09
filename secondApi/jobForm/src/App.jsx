import React from 'react';
import SubmissionSummary from './components/SubmitionSummary';
import { Route, Routes } from 'react-router';
import FinalForm from './components/FinalForm';
import Preview from './components/Preview';
import { ToastContainer } from 'react-toastify';
import CandidateDetails from './components/CandidateDetails';
import Candidates from './components/Candidates';
import SpecificCandidateDetails from './components/SpecificCandedateDetails';
import PageNotFound from './components/PageNotFound';

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />

      <Routes>
        <Route path="/" element={<FinalForm />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/preview/:id" element={<CandidateDetails />} />
        <Route path="/submitted" element={<SubmissionSummary />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidate/:id" element={<SpecificCandidateDetails />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
