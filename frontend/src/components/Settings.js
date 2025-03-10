import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Settings() {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:5000/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (response.ok) {
          setUserData(data)
        } else {
          setError(data.message || 'Failed to fetch user data')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        setError('An error occurred. Please try again.')
      }
    }

    fetchUserData()
  }, [])

  const handleChangePassword = () => {
    navigate('/change-password')
  }

  return (
    <div className="profile-container flex flex-col grow h-dvh mx-auto">
        <div className="flex-1 overflow-y-auto bg-gray-10 p-4 space-y-8">
            <h1 className="text-2xl">Settings</h1>
            {error && <p className="error-message">{error}</p>}
            {userData ? (
              <div className='space-y-2'>
                <h2 className="text-lg">Account details</h2>
              </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    </div>
  )
}

export default Settings
