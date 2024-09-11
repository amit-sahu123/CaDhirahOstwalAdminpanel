import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistanceToNow, parseISO, isAfter } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import {
  faUser,
  faEnvelope,
  faFileAlt,
  faUserTie,
  faBuilding,
  faCalendarCheck,
  faClipboardList,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../../context/AuthContext'
import { useGetCurrentUser } from '../../lib/react-query/queries'
import '../../Utils/admin.css'
import './Dashboard.css'
import Loader from './Loader'

function Dashboard() {
  const { data: userData, isLoading: isLoadingUserData } = useGetCurrentUser()
  const { user, setUser, setIsAuthenticated } = useUserContext()
  const navigate = useNavigate()
  const [newUpdatesCount, setNewUpdatesCount] = useState(0)

  useEffect(() => {
    if (!isLoadingUserData && userData) {
      const now = new Date()
      const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000) 

      let updateCount = 0

      if (userData.employee && userData.employee.length > 0) {
        userData.employee.forEach((employee) => {
          if (
            employee.$createdAt &&
            isAfter(parseISO(employee.$createdAt), twentyFourHoursAgo)
          ) {
            updateCount++
          }
        })
      }

      if (userData.contact && userData.contact.length > 0) {
        userData.contact.forEach((contact) => {
          if (
            contact.$createdAt &&
            isAfter(parseISO(contact.$createdAt), twentyFourHoursAgo)
          ) {
            updateCount++
          }
        })
      }

      if (userData.career && userData.career.length > 0) {
        userData.career.forEach((career) => {
          if (
            career.$createdAt &&
            isAfter(parseISO(career.$createdAt), twentyFourHoursAgo)
          ) {
            updateCount++
          }
        })
      }

      if (userData.meetings && userData.meetings.length > 0) {
        userData.meetings.forEach((meeting) => {
          if (
            meeting.$createdAt &&
            isAfter(parseISO(meeting.$createdAt), twentyFourHoursAgo)
          ) {
            updateCount++
          }
        })
      }

      setNewUpdatesCount(updateCount)
    }
  }, [isLoadingUserData, userData])

  const handleNavigation = (path) => {
    navigate(path)
  }

   if (isLoadingUserData) {
    return <div><Loader/></div>
  }


  return (
    <div className='dashboard-container'>
      <div className='admin-profile'>
        <FontAwesomeIcon icon={faUserTie} className='profile-icon' />
        <div className='profile-details'>
          <p>Admin Name</p>
          <h2>Dhiraj Ostwal</h2>
        </div>
      </div>
      <div className='dashboard-cards'>
        
        <div
          className='dashboard-card new-inquiries'
          onClick={() => handleNavigation('/contact')}
        >
          <FontAwesomeIcon icon={faEnvelope} className='card-icon' />
          <div className='card-content'>
            <h3>New Inquiries</h3>
            <p className='card-count'>{userData.contact.length}</p>
          </div>
        </div>
        <div
          className='dashboard-card new-resumes'
          onClick={() => handleNavigation('/career')}
        >
          <FontAwesomeIcon icon={faFileAlt} className='card-icon' />
          <div className='card-content'>
            <h3>New Resumes</h3>
            <p className='card-count'>{userData.career.length}</p>
          </div>
        </div>
        
        <div
          className='dashboard-card new-meetings'
          onClick={() => handleNavigation('/meetings')}
        >
          <FontAwesomeIcon icon={faCalendarCheck} className='card-icon' />
          <div className='card-content'>
            <h3>New Meetings</h3>
            <p className='card-count'>{userData.meetings.length}</p>
          </div>
        </div>
      

      </div>
      <div className='recent-activities'>
        <h3 className='activities-heading'>Recent Activities</h3>
        <ul className='activities-list'>
         
       

          {userData.contact && userData.contact.length > 0 && (
            <li className='activity'>
              <div className='activity-icon'>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className='activity-details'>
                <p>
                  Received new inquiry from{' '}
                  {userData.contact[userData.contact.length - 1].FirstName}{' '}
                  {userData.contact[userData.contact.length - 1].LastName}
                </p>
                <span className='activity-time'>
                  {formatDistanceToNow(
                    parseISO(
                      userData.contact[userData.contact.length - 1].SubmitDate
                    ),
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
              </div>
            </li>
          )}

          {userData.career && userData.career.length > 0 && (
            <li className='activity'>
              <div className='activity-icon'>
                <FontAwesomeIcon icon={faFileAlt} />
              </div>
              <div className='activity-details'>
                <p>
                  Reviewed resume of{' '}
                  {userData.career[userData.career.length - 1].Name}{' '}
                </p>
                <span className='activity-time'>
                  {formatDistanceToNow(
                    parseISO(
                      userData.career[userData.career.length - 1].SubmitDate
                    ),
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
              </div>
            </li>
          )}

          {userData.contact && userData.contact.length > 0 && (
            <li className='activity'>
              <div className='activity-icon'>
                <FontAwesomeIcon icon={faAddressBook} />
              </div>
              <div className='activity-details'>
                <p>
                  New Meeting Schedule {' '} {formatDistanceToNow(
                    parseISO(
                      userData.meetings[userData.meetings.length - 1].DateTime
                    ),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>
                <span className='activity-time'>
                  {formatDistanceToNow(
                    parseISO(
                      userData.meetings[userData.meetings.length - 1].SubmitDate
                    ),
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
