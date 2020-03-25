var qs = require('querystring');
const log4js = require('log4js');
var rq = require('request-promise')
var logger = log4js.getLogger();
logger.level = 'debug';

logger.debug('We Write Logs with log4js');

function getBase64Str() {
    const fs = require('fs');
    let bitmap = fs.readFileSync('sunflower.jpg');

    let base64str = Buffer.from(bitmap, 'binary').toString('base64'); // base64编码
    // logger.info(base64str)
    return base64str
}

function analysis(access_token, fileStr) {
    request_url = "https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general"
    request_url = request_url + "?access_token=" + access_token
    var param = "image=" + fileStr;
    var options = {
        method: 'POST',
        uri: request_url,
        form: {
            image: fileStr
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    };
    var res = rq(options).then(html => {
        logger.info("analysis-html", html)
        return html;
    }).catch(err => {
        console.log(err);
    })
    return res
}

function getAccessToken() {
    logger.info("getAccessToken")
    var client_id = 'MUcPtsje9zlvXN7cItnbUC1H'
    var client_secret = 'WRKeQ4rq85P9yyARMENFT6yeBuV3Mm4N'
    var url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret;
    var res = rq(url).then(html => {
        logger.info("typeof", typeof html)
        var jsObj = JSON.parse(html)
        var access_token = jsObj.access_token;
        logger.info(access_token)
        var str64 = getBase64Str()
        // logger.info(str64)
        analysis(access_token,str64)
    }).catch(err => {
        console.log(err);
    })
    return res
}

var token = getAccessToken()
