import React from 'react';
import './TopNavbar.css';
import PersonIcon from '@mui/icons-material/Person';
import Offcanvas from './Offcanvas';
import { auth } from '../../firebase'; 
import { useNavigate } from 'react-router-dom'; 

export default function TopNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/login'); 
      })
      .catch((error) => {
        console.error('Error logging out: ', error);
      });
  };

  return (
    <div className='container12'>
      <div className='first'>
        <span>Admin Dashboard</span>
      </div>

      <div className='three'>
        <span>Dhiraj Ostwal</span>
        
        <div className='icon-container'>
          <PersonIcon style={{ color: 'white', fontSize: '30px' }} />
          <div className='name'>
            <span>CA Dhiraj Ostwal</span>
          </div>
        </div>

        <button className='outbtn' onClick={handleLogout}>Logout</button>
        
        <div className='menuicon11'>
          <Offcanvas />
        </div>
      </div>
    </div>
  );
}

