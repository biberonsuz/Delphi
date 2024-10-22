import { useState } from 'react';
import './App.css'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import BookSelection from './components/BookSelection';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const handleSelectBook = (book) => {
    setSelectedBook(book); // Store the selected book and proceed to chat
  };
  return (
    <div className="App">
      <div className="flex h-dvh">
        <Sidebar selectedBook={selectedBook} />
        {!selectedBook ? (
          // Show the book selection screen if no book is selected
          <BookSelection onSelectBook={handleSelectBook} />
        ) : (
          // Show the chat window after the user selects a book
          <Chat selectedBook={selectedBook} />
        )}
      </div>
    </div>
  )
}

export default App;
