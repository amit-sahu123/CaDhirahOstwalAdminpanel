import React from 'react'
import { Link } from 'react-router-dom'
import  './SideNavbar.css'

import { AiFillHome } from 'react-icons/ai';
import { FaCalendarAlt, FaBriefcase } from 'react-icons/fa';
import { MdContacts } from 'react-icons/md';

const SideNavbar=()=>{
    return(
        <>
        <div className='container11'>
            <ul>
                
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
                
            </ul>

        </div>
        </>

    )
}
export default SideNavbar;