import React, { useEffect, useState } from 'react'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faEnvelope,
  faPhone,
  faFileAlt,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons'
import './Career.css' 
import {
  useGetRecentResume,
  useDownloadResume,
} from '../../lib/react-query/queries'

const Career = () => {
  const {
    data: resumeData,
    isLoading: isLoadingResume,
    error,
    refetch,
  } = useGetRecentResume()
  const { mutateAsync: downloadResume, isLoading: isLoadingGetResume } =
    useDownloadResume()
  const [resumes, setResumes] = useState([])

  useEffect(() => {
    if (resumeData && resumeData.documents) {
      setResumes(
        Array.isArray(resumeData.documents) ? resumeData.documents : []
      )
    }
  }, [resumeData])

  const handleDownload = async (imageId) => {
    try {
      const fileUrl = await downloadResume(imageId)
      const newTab = window.open(fileUrl, '_blank')

      setTimeout(() => {
        const link = document.createElement('a')
        link.href = fileUrl
        link.download = 'resume.pdf' 
        link.target = '_self' 
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, 1000)
    } catch (error) {
      console.error('Error handling download:', error)
    }
  }

  return (
    <div className='career-container'>
      <h2>Career Submissions</h2>
      {isLoadingResume ? (
        <div className='loading'>Loading resumes...</div>
      ) : error ? (
        <div className='error'>Error loading resumes: {error.message}</div>
      ) : (
        <div className='resume-list'>
          {resumes.length > 0 ? (
            resumes.map((resume) => (
              <div key={resume.$id} className='resume-item'>
                <div className='resume-header'>
                  <div>
                    <FontAwesomeIcon icon={faUser} /> <strong>Name:</strong>{' '}
                    {resume.Name}
                  </div>

                  <div className='submission-time-elapsed'>
                    <FontAwesomeIcon icon={faCalendarAlt} />{' '}
                    <strong>
                      {formatDistanceToNow(parseISO(resume.SubmitDate), {
                        addSuffix: true,
                      })}
                    </strong>
                  </div>
                </div>
                <div style={{marginTop:'12px'}}>
                  <FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong>{' '}
                  {resume.Email}
                </div>
                <div style={{marginTop:'12px'}}>
                  <FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong>{' '}
                  {resume.Phone}
                </div>
                <div style={{marginTop:'12px'}}>
                  <FontAwesomeIcon icon={faFileAlt} />{' '}
                  <strong>Interest:</strong> {resume.Interest}
                </div>
                <div style={{marginTop:'12px'}}>
                  <FontAwesomeIcon icon={faFileAlt} /> <strong>Resume:</strong>{' '}
                  <button onClick={() => handleDownload(resume.ImageId)} >
                    Download
                  </button>
                </div>
                <p className='submission-date'>
                  <FontAwesomeIcon icon={faCalendarAlt} />{' '}
                  <strong>Date: </strong>
                  {format(parseISO(resume.SubmitDate), 'yyyy-MM-dd')}
                </p>
              </div>
            ))
          ) : (
            <div>No resumes found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Career
