var https = require('https');
var qs = require('querystring');
const log4js = require('log4js');

var logger = log4js.getLogger();
logger.level = 'debug';

logger.debug('We Write Logs with log4js');

async function getAccessToken() {
    const param = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': 'MUcPtsje9zlvXN7cItnbUC1H',
        'client_secret': 'WRKeQ4rq85P9yyARMENFT6yeBuV3Mm4N'
    });
    https.get(
        {
            hostname: 'aip.baidubce.com',
            path: '/oauth/2.0/token?' + param,
            agent: false
        },
        function (res) {
            //  // 在标准输出中查看运行结果
            //     // res.pipe(process.stdout);
            //     var access_token = res.access_token
            //     logger.info(res)
            //     logger.info(Object.prototype.toString.call(res))
            //     logger.info(typeof res)
            //     // logger.info(Object.keys(res))
            //     logger.info(access_token)
            //
            var data = '';
            // 处理流事件 --> data, end, and error
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                // logger.info(data)
                var jsObj = JSON.parse(data)
                access_token = jsObj.access_token;
            });
        }
    );
}

var access_token = getAccessToken()
logger.info(access_token)

function getBase64Str() {
    const fs = require('fs');
    let bitmap = fs.readFileSync('sunflower.jpg');

    let base64str = Buffer.from(bitmap, 'binary').toString('base64'); // base64编码
    logger.info(base64str)
    return base64str
}
