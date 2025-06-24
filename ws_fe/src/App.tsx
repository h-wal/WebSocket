import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setmessage] = useState();  
  const [inputValue, setinputValue] = useState("")

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setmessage(ws)

    ws.onmessage = (e) => {
     alert(e.data)
    }

  }, []);

  function sendMessage() {
    if(!message){
      return;
    }
    //@ts-ignore
    message.send("ping")
  }

  return (
    <>
      <div>
        <input onChange={(e) => setinputValue(e.target.value)} type="text" value={inputValue}/>
        <button onClick={sendMessage}> send</button>
      </div>
    </>
  )
}

export default App
