import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UniversityDetailsPage from './pages/UniversityDetailsPage';
import PortalUniversityDetails from './components/PortalComponents/PortalUniversityDetails';
import ScholarshipPage from './pages/ScholarshipPage';
import ScholarshipDetails from './pages/ScholarshipDetailsPage';
import Admissions from './components/Admssions';

import UniversityPage from './pages/UniversityPage';
import LoginForm from "./components/LoginForm"
import Design from './components/Design';

import SignUpForm from './components/SignUpForm';
import PortalSideBar from './components/PortalSideBar';
// import PortalHome from './components/PortalHome';
import UserProfile from './components/UserProfile';
import AppliedApplications from './components/PortalComponents/AppliedApplications';
import PortalUniversity from './components/PortalComponents/PortalUniversity';
import PortalScholarships from './components/PortalComponents/PortalScholarships';
import PortalScholarshipsDetails from './components/PortalComponents/PortalScholarshipsDetails';
import PortalAdmissions from './components/PortalComponents/PortalAdmissions';
import Recommendation from './components/Recommendation';
import PortalRecommendation from './components/PortalComponents/PortalRecommendation';
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
            <Route path="/recommendation" element={<PortalRecommendation />} />
            <Route path="/portal/" element={<PortalSideBar />} >
              <Route index element={<UserProfile />}/>
              {/* <Route path='/portal/home' element={<PortalHome/>}/> */}
              <Route path="/portal/myApplication" element={<AppliedApplications />}/>
              <Route path="/portal/university" element={<PortalUniversity />} />
              <Route path="university/:id" element={<PortalUniversityDetails />} /> 
              <Route path="/portal/scholarships" element={<PortalScholarships />} />
              <Route path="/portal/recommendation" element={<PortalRecommendation />} />
              <Route path="scholarships/:id" element={<PortalScholarshipsDetails />} />
              <Route path="/portal/admissions" element={<PortalAdmissions />} />
              
            </Route>     
        </Routes> 
}

      </div>
    </Router>
  );
};

export default App;
