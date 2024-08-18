import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Modal from "./Components/Home/Modal";
import PrivateComponent from './Components/Home/PrivateComponent';
import Home from './Pages/Home';
import Counselling from './Pages/Counselling';
import Learning from './Pages/Learning';
import Job_Home from './Pages/Job_Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AllNews from './Components/Home/AllNews';
import Unsubscribe from './Components/Home/Unsubscribe';
import ResetPassword from './Pages/ResetPassword';
import Profile from "./Pages/Profile";
import CreateJob from "./Pages/CreateJob";
import MyJobs from "./Pages/MyJobs";
import JobDetails from './Pages/JobDetails';
import UpdateJob from './Pages/UpdateJob'; // Import UpdateJob component
import Skills from './Components/Job/Skills';
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import HowDoesItWork from "./Pages/HowDoesItWork"
import WhyCareerHub from "./Pages/whyCareerHub"
import AboutUs from "./Pages/AboutUs"

function ScrollToTop() {
  const location = useLocation();
  const { pathname } = location;

  React.useEffect(() => {
    console.log('ScrollToTop triggered for pathname:', pathname); // Debugging line
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop /> {/* Ensure this is inside BrowserRouter */}
        <Modal />
        <Routes>
          {/* Always display Home page components */}
          <Route path="/" element={<Home />} />

          {/* Routes for authenticated users */}
          <Route element={<PrivateComponent />} >
            <Route path='/counselling' element={<Counselling />} />
            <Route path='/learning' element={<Learning />} />
            <Route path='/jobs' element={<Job_Home />} />
            <Route path='/logout' element={<h1>Logout component</h1>} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/profile/change-password/:userId" element={<Profile />} />
            <Route path="/jobs/post-job" element={<CreateJob />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/myJobs" element={<MyJobs />} />
            <Route path="/edit-job/:id" element={<UpdateJob />} /> {/* Simplified route */}
            <Route path="/skills/:id" element={<Skills />} />
            <Route path="all-news" element={<AllNews />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/how-does-it-work" element={<HowDoesItWork />} />
            <Route path="/why-CareerHub" element={<WhyCareerHub />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Route>

          {/* Routes for unauthenticated users */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset_password/:token' element={<ResetPassword />} />
          <Route path='/unsubscribe' element={<Unsubscribe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
