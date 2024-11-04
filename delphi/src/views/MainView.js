import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import BookSelection from '../components/BookSelection'
import Profile from '../components/Profile'

const MainView = () => {
  const [selectedBook, setSelectedBook] = useState(null)
  const [activeView, setActiveView] = useState('chat')
  const [selectedChatId, setSelectedChatId] = useState(null) // State to track the selected chat ID

  const handleSelectBook = (book) => {
    setSelectedBook(book)
    setActiveView('chat')
  }

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId) // Update the selected chat ID when a chat is clicked
    setActiveView('chat') // Switch to chat view
  }

  return (
    <div className="flex h-dvh">
      <Sidebar
        selectedBook={selectedBook}
        setActiveView={setActiveView}
        onSelectChat={handleSelectChat}
      />
      {activeView === 'chat' ? (
        !selectedBook ? (
          <BookSelection onSelectBook={handleSelectBook} />
        ) : (
          <Chat selectedBook={selectedBook} chatId={selectedChatId} /> // Pass selectedChatId to Chat
        )
      ) : activeView === 'profile' ? (
        <Profile />
      ) : (
        <div>Unknown view</div>
      )}
    </div>
  )
}

export default MainView
