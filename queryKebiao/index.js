var http = require('http'),
    iconv = require('iconv-lite');

var name = iconv.encode('甘玲', 'gb2312');


http.get('http://jwzx.cqupt.edu.cn/pubTeaKebiao.php?searchKey=' + name.toString(), function (res) {
    var chunks = [], data;

    res.on('data', function (chunk) {
        chunks.push(chunk);
    });
    res.on('end', function () {
        data = iconv.decode(Buffer.concat(chunks), 'gb2312');
        console.log(data);
    });
});