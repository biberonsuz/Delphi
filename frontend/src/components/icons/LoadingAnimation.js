const LoadingAnimation = () => (
    <div className="flex space-x-1 max-w-4xl mx-auto w-full p-4">
      <span className="dot bg-indigo-500 rounded-full w-1.5 h-1.5 animate-bounce" style={{ animationDelay: '0s' }} />
      <span className="dot bg-indigo-500 rounded-full w-1.5 h-1.5 animate-bounce" style={{ animationDelay: '0.2s' }} />
      <span className="dot bg-indigo-500 rounded-full w-1.5 h-1.5 animate-bounce" style={{ animationDelay: '0.4s' }} />
    </div>
  )
  
  export default LoadingAnimation
  