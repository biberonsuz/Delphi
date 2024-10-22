import { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSend} className="flex items-center p-4 bg-gray-10">
      <input
        type="text"
        className="flex-1 px-4 py-2 bg-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Ask Delphi"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded-3xl hover:bg-indigo-600"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
