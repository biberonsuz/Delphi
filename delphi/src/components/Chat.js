import { useState, useRef, useEffect } from 'react'
import Message from './Message'
import MessageInput from './MessageInput'
import LoadingAnimation from './icons/LoadingAnimation'

const Chat = ({ selectedBook, chatId }) => {
  const initMessage = `Hello, I am Delphi. Let's start reading ${selectedBook.title} by ${selectedBook.author}:`
  
  const [messages, setMessages] = useState([{ text: initMessage, sender: 'bot' }])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!chatId) return

      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`http://localhost:5000/api/chat-history?chatId=${chatId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setMessages(data.history)
        } else {
          console.error('Failed to fetch chat history')
        }
      } catch (error) {
        console.error('Error fetching chat history:', error)
      }
    }

    fetchChatHistory()
  }, [chatId])

  const sendMessageToServer = async (message) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message, chatId }),
      })

      const data = await response.json()
      return data.reply
    } catch (error) {
      console.error('Error sending message to server:', error)
      return "Sorry, I couldn't process your request."
    } finally {
      setIsLoading(false)
    }
  }

  const addMessage = async (message) => {
    setMessages([...messages, { text: message, sender: 'user' }])

    const botReply = await sendMessageToServer(message)

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botReply, sender: 'bot' },
    ])
  }

  return (
    <div className="flex flex-col grow h-dvh mx-auto">
      <div className="flex-1 overflow-y-auto bg-gray-10 p-4">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
        {isLoading && (
          <div className="flex items-center">
            <LoadingAnimation />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={addMessage} />
    </div>
  )
}

export default Chat
