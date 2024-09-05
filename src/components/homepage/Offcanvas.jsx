import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import './Offcanvas.css'
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaCalendarAlt, FaBriefcase } from 'react-icons/fa';
import { MdContacts } from 'react-icons/md';
import { Padding } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';


export default function Offcanvas() {
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
    <>
    <button className="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <MenuIcon style={{color:'white',fontSize:'36px' }}/> </button>

<div className="offcanvas offcanvas-end " style={{ width:'60vw', backgroundColor:'rgb(31,38,60)'}} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" >
  <div className="offcanvas-header">
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" style={{filter: 'invert(1)'}}></button>
  </div>
  <div className="offcanvas-body">
   <div className='offcontainer' >
   <ul >

                <li> <Link to="/">
                <AiFillHome className="icon" /> Dashboard
                </Link> </li>
                
                <li> <Link to="/meeting">
                <FaCalendarAlt className="icon" /> Meeting
                </Link>  </li>

                <li> <Link to="/contact">
                <MdContacts className="icon" /> Contact
                </Link>  </li>

                <li> <Link to="/career">
                <FaBriefcase className="icon" /> Career
                </Link>  </li>

                 <li>
                  <button style={{padding:'7px 15px',backgroundColor:'orangered',color:'white',borderRadius:'50px', border:'none',fontSize:'20px',fontWeight:'600'}} onClick={handleLogout}>Signout</button>

                 </li>
  </ul>

   </div>
  
    
  </div>
</div>
  
 
     
 
     </>
  )
}

