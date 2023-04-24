import { useState } from 'react'
import Signin from './Components/Login/Signin';
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Signin/>
    </>
  )
}

export default App
