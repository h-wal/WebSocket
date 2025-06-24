"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
function App() {
    const [message, setmessage] = (0, react_1.useState)();
    const [inputValue, setinputValue] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setmessage(ws);
        ws.onmessage = (e) => {
            alert(e.data);
        };
    }, []);
    function sendMessage() {
        if (!message) {
            return;
        }
        //@ts-ignore
        message.send("ping");
    }
    return (<>
      <div>
        <input onChange={(e) => setinputValue(e.target.value)} type="text" value={inputValue}/>
        <button onClick={sendMessage}> send</button>
      </div>
    </>);
}
exports.default = App;
