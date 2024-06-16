import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import DrugSearch from './pages/DrugSearch/DrugSearch';
import DrugDetails from './pages/DrugDetails/DrugDetails';
import './index.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/drugs/search" element={<DrugSearch />} />
      <Route path="/drugs/:drugName" element={<DrugDetails />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
