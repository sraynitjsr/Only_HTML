const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('client.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading client.html');
    }
    res.writeHead(200);
    res.end(data);
  });
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(message); // Echo the received message back to the client
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
