import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UniversityDetailsPage from './pages/UniversityDetailsPage';
import ScholarshipPage from './pages/ScholarshipPage';
import ScholarshipDetails from './pages/ScholarshipDetailsPage';
import Admissions from './components/Admssions';

import UniversityPage from './pages/UniversityPage';
import LoginForm from "./components/LoginForm"
import Design from './components/Design';

import SignUpForm from './components/SignUpForm';

const App = () => {
  return (
    <Router>
      <div className="App"> 
 
        <Routes>
          <Route path="/" element={<Design/>}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/UniversityDetailsPage/:id" element={<UniversityDetailsPage />} />
            <Route path="/Scholarships" element={<ScholarshipPage />} />
            <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
            <Route path="/Universities" element={<UniversityPage />} />
            <Route path="/Admission" element={<Admissions />} />
          </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUpForm />} />
                  
        </Routes>
      
         

      </div>
    </Router>
  );
};

export default App;
