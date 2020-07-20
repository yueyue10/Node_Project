var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var router = express();


function getHtml1() {
    var cnodeUrl = 'https://www.nowcoder.com/discuss';
    superagent.get(cnodeUrl).end(function (err, sres) {
        // 常规的错误处理
        if (err) {
            console.error(err)
        }
        // sres.text 里面存储着网页的 html 内容
        let $ = cheerio.load(sres.text);
        let items = [];
        $('.discuss-main').each(function (idx, element) {
            let $element = $(element);
            items.push({
                title: $element.find('a').text(),
                href: $element.find('a').attr('href'),
                link: url.resolve(cnodeUrl, $element.find('a').attr('href'))
            });
        });
        console.log(items)
    })
}

async function getWeiXinHtml() {
    var cnodeUrl = 'https://mp.weixin.qq.com/s/Dc9h48oNsh82I760U1OdYg';
    superagent.get(cnodeUrl).end(function (err, sres) {
        // 常规的错误处理
        if (err) {
            console.error(err)
        }
        let $ = cheerio.load(sres.text);
        let items = [];
        $('div.rich_media_content').children()
            .each(function (i, elem) {
                let content = {}
                if ($(this).is('p')) {
                    let text = $(this).find('span').text();
                    if (text) content.text = text
                    let image = $(this).find('img').attr('data-src');
                    if (image) content.image = image
                }
                if ($(this).is('section')) {
                    let code = $(this).find('code').text();
                    if (code) {
                        content.code = code
                    } else {
                        let text = $(this).find('span').text();
                        if (text) code.title = text
                    }
                }
                items[i] = content
            });
        console.log(items)
    })
}

module.exports = {
    getWeiXinHtml
}
