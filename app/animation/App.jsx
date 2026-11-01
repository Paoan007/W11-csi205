import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import './App.css'
import Animation from './components/Animation'


function App() {
  const [keyEvent,setKeyEvent] = useState(null)
  useEffect(() =>{

    const handleKeyDown = (e) => {
      setKeyEvent(e)
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }

  }, []) // [] => render onload (once)
        // => alway render (every trigger)
        // [x] => render when x is change
  return (
    <>
     <h1 className='text-center mt-3'>68070606 ภาคิน งามเดชากิจ</h1>
     <Animation keyEvent={keyEvent}/>

     {/* <Animation fieldHeight={200} fieldWidth={300} ballRadius={25} /> */}
    </>
  )
}

export default App