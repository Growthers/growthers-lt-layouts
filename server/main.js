const WebSocket = require("ws");

const server = new WebSocket.Server({port: 8080});

server.on("connection", ws => {
    ws.on("message", mes => {
        console.log(JSON.parse(mes))
      server.clients.forEach(c => {
          c.send(JSON.stringify(JSON.parse(mes)));
      });
    })
});
