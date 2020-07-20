var fs = require("fs");
var http = require('http');
var express = require('express');

var app = express();
const hostname = '192.168.137.1';
const port = 3000;

app.get('/download/*', function (req, res, next) {

    //第一种方式
    //var f="F:/ftproot/NW.js.docx";
    //var f="f:/ftproot/我是中文的语言.txt"
    ////var f = req.params[0];
    //f = path.resolve(f);
    //console.log('Download file: %s', f);
    //res.download(f);

    //第二种方式
    var path = "1-202005181147.log";
    var f = fs.createReadStream(path);
    res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-Disposition': 'attachment; filename=202005181147.log'
    });
    f.pipe(res);
});

const server = http.createServer(app);

server.listen(port, hostname, function () {
    console.log('服务器运行在' + hostname + ":" + port);
})
