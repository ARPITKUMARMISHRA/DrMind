import './App.css';
import { React, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Authentication and Sockets
import AuthState from './contexts/auth/authState';
import AuthContext from './contexts/auth/authContext';
import io from 'socket.io-client';
import socketInit from './sockets';

// Components
import Signin from './components/Login/Signin';
import Signup from './components/Login/Signup';
import Map from './components/Maps/Map';
import NotFound from './components/Errors/NotFound';
import Chatbot from './components/Chatbot/Chatbot';
import Quiz from './components/Quiz/Quiz';
import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';
import Navbar from './components/Navbar/Navbar';
import ChatbotPage from './components/Chatbot/ChatbotPage';
import Yoga from './components/Yoga/Yoga';

// Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';


// App
function App() {
  const [login, setLogin, socket] = useContext(AuthContext);
  const [arrivedMsg, setArrivedMsg] = useState(undefined);

  useEffect(() => {
    if (login) {
      socketInit(socket);
    }
  });

  // For the arrival of new message
  useEffect(() => {
    if (login && socket) {
      socket.on('receive-msg', ({ _id, from, msg, time }) => {
        // When chat page is not open, show the notification
        if (!window.location.pathname.match('/chat')) {
          chatNotification(msg);
        }
        // Setting the new arrived msg, so that <Chat/> can access it
        setArrivedMsg({ _id, from, msg, time });
      });
      return () => { socket.off('receive-msg'); }
    }
  }, [login, socket]);

  // For showing the notification of new message
  const chatNotification = (msg) => {
    toast.info(msg);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {
          !login ?
            <>
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
            </>
            :
            <>
              <Route path='/map' element={<Map />} />
              <Route path='/chatbot' element={<ChatbotPage />} />
              <Route path='/chat' element={<Chat arrivedMsg={arrivedMsg} />} />
            </>
        }
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/yoga' element={<Yoga />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
