// Dashboard.js
import React from 'react';
// import UserInfo from '../components/Job/UserInfo';
// import Skills from '../components/Job/Skills';
// import Settings from '../components/Job/Settings';
// import SideBar from '../components/Job/SideBar';
// import Content from '../components/Job/Content';
// import Profile from '../components/Job/Profile';
// import '../App.css';
const Dashboard = ({ user, skills }) => {
  return (
    <div className='dashboard'>
      <SideBar />
      <div className="dashboard--content">
        <Content/>
        <Profile/>
      </div>
    </div>
  )
};

export default Dashboard;
