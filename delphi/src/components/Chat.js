import { useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';

const Chat = ({ selectedBook }) => {
  const initMessage = `Hi, I am Delphi. What would you like to know about ${selectedBook.title} by ${selectedBook.author}?`;

  const [messages, setMessages] = useState([
    { text: initMessage, sender: "bot" }
  ]);

  // Function to send the message to the server and handle the response
  const sendMessageToServer = async (message) => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Error sending message to server:', error);
      return "Sorry, I couldn't process your request.";
    }
  };

  const addMessage = async (message) => {
    // Add user's message
    setMessages([...messages, { text: message, sender: "user" }]);

    // Send the message to the server and get the response
    const botReply = await sendMessageToServer(message);

    // Add bot's reply
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botReply, sender: "bot" }
    ]);
  };

  return (
    <div className="flex flex-col grow h-dvh mx-auto">
      <div className="flex-1 overflow-y-auto bg-gray-10 p-4">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      <MessageInput onSend={addMessage} />
    </div>
  );
};

export default Chat;