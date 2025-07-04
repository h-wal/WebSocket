"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
//event Handler
wss.on("connection", function (socket) {
    socket.on("message", (e) => {
        const message = e.toString();
        if (message === "ping") {
            socket.send("pong");
        }
    });
});
