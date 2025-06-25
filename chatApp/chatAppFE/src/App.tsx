import { useEffect, useRef, useState } from 'react'

function App() {
  const [message, setMessage]= useState(["hi there" , "hello"])
  const [inputMessage, setInputMessage] = useState("");
  const wsRef= useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      ws.send(JSON.stringify({
        "type": "join",
        "payload": {
          "room": "red"
        }
      }));
    }

    ws.onmessage = (event) => {
      setMessage(prev => [...prev, event.data])
    };
    
    wsRef.current = ws;

  }, [])

  return (
      <div id="interface" className="bg-gray-700 text-white h-screen w-screen flex flex-col justify-start items-center" >
        <div>
          WhatsApp
        </div>
        <div className='mt-2 flex p-2 gap-2'>
          <div className='p-2'>
            Join a Room  :
          </div>
          <input type="text" placeholder='Room Id' className="border border-white rounded-2xl p-2" />
          <button className='cursor-pointer border border-white rounded-2xl text-xs p-2'>Send</button>
        </div>
        <div className="mt-2 w-full p-10">
          <div className='border border-white rounded-md w-full h-96 p-4'>
            {message.map((message, index) =>
              <div key={index} className='flex flex-row'>
                <div className='text-gray-700 bg-white rounded-md p-1 my-1 text-sm'>
                  {message}
                </div>
              </div>
            )}
          </div>
          <div className='border w-full border-white rounded-2xl m-2 flex flex-row justify-between'>
            <div>
              <input onChange={(e) => setInputMessage(e.target.value)} className="p-2 w-134 h-full rounded-l-2xl" value={inputMessage} type="text" placeholder='Enter Text'/>
            </div>
            <div>
              <button onClick={() => {
                //@ts-ignore
                wsRef.current.send(JSON.stringify({
                  type: "chat",
                  payload:{
                    message: inputMessage
                  }
                }))
              }} className='p-2 justify-end cursor-pointer border-l border-white'>Submit</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default App
