let fs = require("fs");
let http = require('http');
let path = require('path'); //系统路径模块
let express = require('express');

let router = express();
const hostname = "127.0.0.1"
const port = 3000;

//写入文件
router.get('/setUrl*', function (req, res, next) {
    console.log(req.method);
    console.log(req.query, typeof req.query);
    let result = {msg: '参数错误'}
    if (req.query.cc) {
        let file = path.join(__dirname, 'url.json');
        let fileStr = fs.readFileSync(file, 'utf-8')
        result = JSON.parse(fileStr);
        result.msg = req.query.cc
        fs.writeFile(file, JSON.stringify(result), {'flag': 'w'}, function (err) {
            if (err) {
                throw err;
            }
        })
    }
    res.writeHeader(200, {"Content-Type": "text/html;charset:utf-8"});
    res.write('<head><meta charset="utf-8"/></head>');
    console.log("getUrl", result);
    res.end(JSON.stringify(result));
});

//读取文件
router.get('/getUrl*', function (req, res, next) {
    let file = path.join(__dirname, 'url.json');
    let fileStr = fs.readFileSync(file, 'utf-8')
    let result = JSON.parse(fileStr);
    res.writeHeader(200, {"Content-Type": "text/html;charset:utf-8"});
    res.write('<head><meta charset="utf-8"/></head>');
    console.log("getUrl", result);
    res.end(fileStr);
});

//服务
const server = http.createServer(router);

server.listen(port, hostname, function () {
    console.log('服务器运行在', hostname + ":" + port);
})
