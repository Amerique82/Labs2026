// Lab 5 - Part 1: Basic Node.js HTTP server (no Express)
// Run with: node index.js
// Then visit: http://127.0.0.1:3000

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World from Node.js!');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
