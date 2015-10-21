var http = require('http'),
    iconv = require('iconv-lite'),
    urlencode = require('urlencode'),
    hostname = 'http://jwzx.cqupt.edu.cn/';
    name = process.argv[2];

var str = urlencode(name, 'gbk');


http.get('http://jwzx.cqupt.edu.cn/pubTeaKebiao.php?searchKey=' + str, function (res) {
    var chunks = [], data, link;

    res.on('data', function (chunk) {
        chunks.push(chunk);
    });
    res.on('end', function () {
        data = iconv.decode(Buffer.concat(chunks), 'gb2312');
        link = hostname + data.match(/<a.*<\/a>/)[0].match(/href=\'(.*)\'/)[1];
        http.get(link, function (res) {
            var chunks = [], data, kebiao, array = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                data = iconv.decode(Buffer.concat(chunks), 'gb2312');
                kebiao = data.match(/<tr>[\s\S]*<\/tr>/gi)[0];
                array = kebiao.split('</tr><tr>');
                array.forEach(function (ele, i) {
                    console.log(ele, i);
                });
            });
        })
    });
});