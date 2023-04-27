import './App.css';
import { React, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthState from './contexts/auth/authState';
import AuthContext from './contexts/auth/authContext';
import Signin from './components/Login/Signin';
import Signup from './components/Login/Signup';
import Map from './components/Maps/Map';
import NotFound from './components/Errors/NotFound';
import { socket } from './socket';

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
  });
  const [login, setLogin] = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<>Homepage without login</>} />
        {
          !login ?
            <>
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
            </>
            :
            <Route path='/map' element={<Map />} />
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
