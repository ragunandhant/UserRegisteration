import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Form from './form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ backgroundColor: "#0040ff", height: "fit-content" }}>
      <Form />
      <ToastContainer />
    </div>
  )
}

export default App
