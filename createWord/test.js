const counter = require('./index.js');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function (req, res) {
    counter.exportWord(req, res);
})

server.listen(port, hostname, function () {
    console.log('服务器运行在' + hostname + ":" + port);
})