import { useState, useEffect, useRef } from 'react'
import Message from './Message'
import MessageInput from './MessageInput'
import LoadingAnimation from './icons/LoadingAnimation'

const Chat = ({ book, chatId: initialChatId, onStopStreaming }) => {
  const speed = 150
  const [messages, setMessages] = useState([{ text: ``, sender: 'bot', speed: speed }])
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [lastParagraphs, setLastParagraphs] = useState([])
  const [currentBook, setCurrentBook] = useState(book)
  const [chatId, setChatId] = useState(initialChatId)

  const isCreatingChat = useRef(false)
  const isStreamingRef = useRef(false)

  const stopStreaming = () => {
    isStreamingRef.current = false
    if (onStopStreaming) onStopStreaming()
  }

  useEffect(() => {
    const fetchChat = async () => {
      if (!chatId || currentBook) return
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:5000/api/get-chat?chatId=${chatId}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })

        if (response.ok) {
          const data = await response.json()
          setCurrentBook(data.book)
          setMessages(data.messages || [])
        } else {
          console.error('Failed to fetch chat:', response.status)
        }
      } catch (error) {
        console.error('Error fetching chat:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!currentBook) {
      fetchChat()
    }
  }, [chatId, currentBook])

  useEffect(() => {
    const createChat = async () => {
      if (isCreatingChat.current || !currentBook) return
      isCreatingChat.current = true
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/create-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ book: currentBook })
        })

        if (response.ok) {
          const data = await response.json()
          setChatId(data.chatId)
          setCurrentBook(currentBook)
        } else {
          console.error('Error creating chat:', response.status)
        }
      } catch (error) {
        console.error('Error creating chat:', error)
      } finally {
        setIsLoading(false)
        isCreatingChat.current = false
      }
    }
    if (!chatId && currentBook) {
      createChat()
    }
  }, [currentBook, chatId])

  useEffect(() => {
    const fetchBookStream = async () => {
      if (isStreamingRef.current || !chatId) return
      try {
        isStreamingRef.current = true
        const response = await fetch(`http://localhost:5000/api/stream-book?chatId=${chatId}&speed=${speed}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (isStreamingRef.current) {
          const { done, value } = await reader.read()
          if (done) break

          const paragraph = decoder.decode(value).trim()
          setMessages(prev => [...prev, { text: paragraph, sender: 'bot', speed: speed }])
          setLastParagraphs(prev => [prev[prev.length - 1], paragraph].filter(Boolean))
        }

        isStreamingRef.current = false
      } catch (error) {
        console.error('Error streaming book:', error)
        isStreamingRef.current = false
      }
    }

    if (chatId) {
      fetchBookStream()
    }

    return () => stopStreaming()
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
        body: JSON.stringify({ message, chatId, lastParagraphs })
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
    stopStreaming()
    setMessages([...messages, { text: message, sender: 'user' }])

    const botReply = await sendMessageToServer(message)
    setMessages(prev => [...prev, { text: botReply, sender: 'bot', speed: speed }])
  }

  return (
    <div className="flex flex-col grow h-dvh mx-auto">
      <div className="flex-1 overflow-y-auto bg-gray-10 p-4">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} speed={msg.speed} />
        ))}
        {isLoading && (
          <div className="flex items-center">
            <LoadingAnimation />
          </div>
        )}
      </div>
      <MessageInput onSend={addMessage} />
    </div>
  )
}

export default Chat
