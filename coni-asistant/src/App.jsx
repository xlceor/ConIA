import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Asistant from './pages/CurrentAsistant';
import Home from './pages/Home';
import Landing from './pages/Landing';
import ChatRoom from './pages/ChatRoom';
import Sidebar from './components/SideBar';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import Projects from './pages/proyects';
import Project from './pages/Proyect';
import Tasks from './pages/Tasks';
import Task from './pages/Task';
import './styles/App.css';
import LogoTransition from './pages/LogoTransition';


function App() {
  const [user, loading] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [background, setBackground] = useState('white');

  // const changeBackground = (color) => {
  //   setBackground(color);
  // };

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div className='flex justify-center items-center w-screen h-screen'><LogoTransition /></div>;
  }


  return (
    <div className="App min-h-screen relative text-white flex flex-col">
       {/* style={{ backgroundColor: background, height: '100vh' }} */}
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        {isLoggedIn && (
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <Sidebar />
          </div>
        )}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Landing />} />
            {isLoggedIn ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/chatroom" element={<ChatRoom />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/asistant" element={<Asistant />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/task/:id" element={<Task />} /> 
                <Route path="*" element={<Navigate to="/home" />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
