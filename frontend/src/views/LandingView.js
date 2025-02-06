import { useNavigate } from 'react-router-dom';

const LandingView = () => {
  const navigate = useNavigate()

  const handleSignUp = () => {
    navigate('/signup')
  };

  const handleLogin = () => {
    navigate('/login')
  };

  return (
    <div className="landing-page flex w-vw h-dvh">
      <div className="w-3/5 bg-indigo-300">
        <img src=""></img>
      </div>
      <div className="flex flex-col h-full items-center justify-center w-2/5 space-y-2">
        <h1 className="text-6xl">Delphi</h1>
        <p>AI Literature Assistant</p>
        <div className="space-y-2 py-4">
          <button className="w-full btn-primary" onClick={handleLogin}>Log In</button>
          <button className="w-full btn-secondary" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
      
    </div>
  );
};

export default LandingView;
