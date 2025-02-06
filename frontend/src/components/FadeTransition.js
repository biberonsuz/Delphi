import { useState, useEffect } from 'react';

const FadeTransition = ({ children, duration = 500 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div
      className={`transition-opacity duration-${duration} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

export default FadeTransition;
