const http = require('http');
const path = require('path'); //系统路径模块

const hostname = '127.0.0.1';
const port = 3000;
var fs = require('fs');
var file = path.join(__dirname, 'rename.json'); //文件路径，__dirname为当前运行js文件的目录
var result = JSON.parse(fs.readFileSync(file, 'utf-8'));
//操作对象

const server = http.createServer(function (req, res) {
    res.writeHeader(200, {
        'Content-Type': 'text/html;charset:utf-8'
    });
    res.write('<head><meta charset="utf-8"/></head>');
    var jsStr = JSON.stringify(result);
    console.log(jsStr);
    res.end(jsStr);
})

server.listen(port, hostname, function () {
    console.log('服务器运行在', hostname + ":" + port);
})
