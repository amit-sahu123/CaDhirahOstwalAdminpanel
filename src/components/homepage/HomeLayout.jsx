import React from 'react';
import './HomeLayout.css';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import { auth } from '../../firebase'; 
import { useNavigate } from 'react-router-dom';

const HomeLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login'); 
    });
  };

  return (
    <div className='layout'>
      <TopNavbar />
      <button onClick={handleLogout}>Logout</button>
      <div className='layout-content12' style={{paddingTop:'0px'}}>
        <div className="side-navbar">
          <SideNavbar /> 
        </div>
        <div className='main-content13' >
          {children}
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
