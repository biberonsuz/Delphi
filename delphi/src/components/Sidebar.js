import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarListItem from './SidebarListItem'
import SettingsIcon from './icons/SettingsIcon'
import SidebarIcon from './icons/SidebarIcon'
import ProfileIcon from './icons/ProfileIcon'
import LogOutIcon from './icons/LogOutIcon'
import NewIcon from './icons/NewIcon'
import BookIcon from './icons/BookIcon'

const Sidebar = ({ selectedBook, setActiveView, onSelectChat }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [chats, setChats] = useState([])
  const [selectedItem, setSelectedItem] = useState("Library") // default selected item
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    if (token) fetchUserChats(token)
  }, [])

  const fetchUserChats = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user-chats', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setChats(data.chatIds)
      } else {
        console.error('Failed to fetch chats')
      }
    } catch (error) {
      console.error('Error fetching chats:', error)
    }
  }

  const toggleSidebar = (e) => {
    e.preventDefault()
    setIsCollapsed(!isCollapsed)
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className={`flex flex-col bg-gray-100 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-2 flex justify-between">
        <a href="#" className="flex items-center gap-2 text-sm p-2">
          <span className="py-1 px-1 rounded-3xl bg-gray-200 hover:bg-gray-300">
            <NewIcon size={24} strokeWidth={1.5} />
          </span>
        </a>
        <a href="#" onClick={toggleSidebar} className="flex items-center gap-2 text-sm">
          <span className="py-1 px-1 rounded-3xl hover:bg-gray-300">
            <SidebarIcon className={`-translate-x-0.5 ${isCollapsed ? 'rotate-180' : ''}`} size={24} strokeWidth={1.6} />
          </span>
        </a>
      </div>
      <nav className="flex flex-col p-2 grow">
        <ul className="space-y-4 border-b border-gray-300 pb-4">
          <SidebarListItem
            icon={SettingsIcon}
            label={!isCollapsed && "Library"}
            href="#"
            isSelected={selectedItem === "Library"}
            onClick={() => { setSelectedItem("Library") }}
          />
          <SidebarListItem
            icon={ProfileIcon}
            label={!isCollapsed && "Profile"}
            href="#"
            isSelected={selectedItem === "Profile"}
            onClick={() => {
              setSelectedItem("Profile")
              setActiveView('profile')
            }}
          />
          <SidebarListItem
            icon={SettingsIcon}
            label={!isCollapsed && "Settings"}
            href="#"
            isSelected={selectedItem === "Settings"}
            onClick={() => { setSelectedItem("Settings") }}
          />
        </ul>
        <ul className="space-y-2 grow pt-4">
          {selectedBook ? (
            <SidebarListItem
              icon={BookIcon}
              label={!isCollapsed && `${selectedBook.title} — ${selectedBook.author}`}
              href="#"
              isSelected={selectedItem === selectedBook.title}
              onClick={() => setSelectedItem(selectedBook.title)}
            />
          ) : (
            <SidebarListItem
              icon={BookIcon}
              label={!isCollapsed && "New Book"}
              href="#"
              isSelected={selectedItem === "New Book"}
              onClick={() => setSelectedItem("New Book")}
            />
          )}
          {chats.map((chatId, index) => (
            <SidebarListItem
              key={index}
              icon={BookIcon}
              label={!isCollapsed && `Chat ${index + 1}`}
              href="#"
              isSelected={selectedItem === `Chat ${index + 1}`}
              onClick={() => {
                setSelectedItem(`Chat ${index + 1}`)
                onSelectChat(chatId)
              }}
            />
          ))}
        </ul>
        {isLoggedIn && (
          <ul className="pt-4">
            <SidebarListItem
              icon={LogOutIcon}
              label={!isCollapsed && "Log Out"}
              isSelected={false} // Log Out doesn't need selection highlight
              onClick={handleLogout}
              href="#"
            />
          </ul>
        )}
        <div className="pt-4 bg-gray-100">
          {!isCollapsed && <p className="text-xs text-center">&copy; 2024 Delphi Demo.</p>}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
