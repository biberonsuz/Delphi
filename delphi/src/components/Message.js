const Message = ({ text, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`px-4 py-2 text  ${
          isUser ? 'border rounded-3xl max-w-md border-indigo-500 text-indigo-500' : 'max-w-full text-gray-700 border-gray-700'
        }`}
      >
        <p className="text-left">{text}</p>
      </div>
    </div>
  );
};

export default Message;
