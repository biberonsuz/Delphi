import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import BookSelection from '../components/BookSelection'
import Profile from '../components/Profile'
import Dashboard from '../components/Dashboard'
import Settings from '../components/Settings'
import Books from '../booksList'

const MainView = () => {
  const [selectedBook, setSelectedBook] = useState(null)
  const [activeView, setActiveView] = useState('library')
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [isStreaming, setIsStreaming] = useState(false)

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId)
    setActiveView('chat')
  }
  const handleSelectBook = (book) => {
    setActiveView('chat')
    console.log(book)
    setSelectedBook(book)
  }

  const stopStreaming = () => {
    setIsStreaming(false)
  }

  useEffect(() => {
    if (activeView !== 'chat' && isStreaming) {
      stopStreaming()
    }
  }, [activeView])

  return (
    <div className="flex h-dvh">
      <Sidebar setActiveView={setActiveView} />
      {activeView === 'library' ? (
        <Dashboard 
          books={Books} 
          onSelectChat={handleSelectChat}
          onSelectBook={handleSelectBook}
        />
      ) : activeView === 'chat' ? (
          <Chat 
            chatId={selectedChatId} 
            book={selectedBook} 
            onStopStreaming={stopStreaming} 
          />
      ) : activeView === 'profile' ? (
        <Profile />
      ) : activeView === 'settings' ? (
        <Settings />
      ) : (
        <div>Unknown view</div>
      )}
    </div>
  )
}

export default MainView
