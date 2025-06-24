import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//event Handler
wss.on("connection", function(socket){
    socket.on("message", (e) => {
        const message = e.toString();
        if (message === "ping"){
            socket.send("pong")
        }
    })
})