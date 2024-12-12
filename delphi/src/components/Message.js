import { useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import useTypewriter from '../hooks/useTypewriter'

const Message = ({ text, sender, speed }) => {
  const isUser = sender === "user"
  const displayedText = useTypewriter(isUser ? '' : text, speed)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [displayedText])

  return (
    <div className={`flex max-w-4xl mx-auto ${isUser ? 'justify-end' : 'justify-start'} mb-4 inline`}>
      <div
        className={`px-4 py-2 text inline ${
          isUser ? 'border rounded-3xl max-w-md border-indigo-500 text-indigo-500' : 'max-w-full text-gray-700 border-gray-700'
        }`}
      >
        <ReactMarkdown className="markdown-content space-y-4 inline">
          {isUser ? text : displayedText}
        </ReactMarkdown>
        <div ref={messagesEndRef} />
      </div>
      <style>
        {`
          .markdown-content p {
            display:inline;
          }
          .markdown-content ul {
            background: #f9fafb;
            padding:1rem 1.25rem;
            border-radius: 1rem;
            margin: 1rem 0;
          }
          .markdown-content li {
            padding-bottom:1rem;
          }
          .markdown-content pre {
            background: #f9fafb;
            padding:1rem 1.25rem;
            border-radius: 1rem;
            overflow-x:scroll;
            margin: 1rem 0;
            border: 1px solid #e5e7eb;
          }
          .markdown-content code {
            font-family:Menlo;
          }
        `}
      </style>
    </div>
  )
}

export default Message
