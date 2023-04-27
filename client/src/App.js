import './App.css';
import { React, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthState from './contexts/auth/authState';
import AuthContext from './contexts/auth/authContext';
import Signin from './components/Login/Signin';
import Signup from './components/Login/Signup';
import Map from './components/Maps/Map';
import NotFound from './components/Errors/NotFound';

function App() {
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
