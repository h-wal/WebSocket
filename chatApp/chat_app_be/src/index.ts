import { WebSocketServer , WebSocket} from "ws";

const wss= new WebSocketServer({
    port: 8080,
});

interface User {
    socket: WebSocket,
    room: string
}

let Users: User[] = []

wss.on("connection", (socket: WebSocket) => {

    console.log(socket);

    socket.on('message', (event) => {

        const parsedMessage = JSON.parse(event as unknown as string);

        if (parsedMessage.type === "join"){
            Users.push({
                socket: socket, 
                room: parsedMessage.payload.roomId,
            })
        }

        if (parsedMessage.type === "chat"){
            //@ts-ignore
            const userRoomId = (Users.find((x) => x.socket == socket)).room;
            const chat = parsedMessage.payload.message;

            for(let i=0; i<Users.length; i++){
                if(Users[i].room === userRoomId){
                    Users[i].socket.send(`${chat} from server :)`)
                }  
            }
        }
    })

})