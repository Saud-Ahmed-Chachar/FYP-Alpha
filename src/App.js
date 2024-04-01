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
import Portal from './pages/Portal';
import PortalSideBar from './components/PortalSideBar';
import PortalHome from './components/PortalHome';
import UserProfile from './components/UserProfile';
import AppliedApplications from './components/PortalComponents/AppliedApplications';
import PortalUniversity from './components/PortalComponents/PortalUniversity';
const App = () => {
  return (
    <Router>
      <div className="App"> {      
        
        //  <Routes>
        //   <Route path="/" element={<PortalSideBar />}>
        //   <Route index element={<PortalHome />} />
        //   <Route path="/profile" element={<UniversityPage />} />
        //   </Route>
        // </Routes> 

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
            <Route path="/portal/" element={<PortalSideBar />} >
              <Route index element={<UserProfile />}/>
              <Route path='/portal/home' element={<PortalHome/>}/>
              <Route path="/portal/myApplication" element={<AppliedApplications />}/>
              <Route path="/portal/university" element={<PortalUniversity />} />
              <Route path="/portal/scholarships" element={<PortalUniversity />} />
              <Route path="/portal/admissions" element={<PortalUniversity />} />
              
            </Route>     
        </Routes> 
}

      </div>
    </Router>
  );
};

export default App;
