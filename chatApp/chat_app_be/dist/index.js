"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({
    port: 8080,
});
let Users = [];
wss.on("connection", (socket) => {
    console.log(socket);
    socket.on('message', (event) => {
        const parsedMessage = JSON.parse(event);
        if (parsedMessage.type === "join") {
            Users.push({
                socket: socket,
                room: parsedMessage.payload.roomId,
            });
        }
        if (parsedMessage.type === "chat") {
            //@ts-ignore
            const userRoomId = (Users.find((x) => x.socket == socket)).room;
            const chat = parsedMessage.payload.message;
            for (let i = 0; i < Users.length; i++) {
                if (Users[i].room === userRoomId) {
                    Users[i].socket.send(`${chat} from server :)`);
                }
            }
        }
    });
});
