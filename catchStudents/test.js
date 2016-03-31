var http = require('http'),
    iconv = require('iconv-lite'),
    urlencode = require('urlencode'),
    mysql = require('mysql'),
    link = 'http://jwzx.cqupt.edu.cn/pubBjStu.php?searchKey=';

    http.get(link + 2013217006, function (res) {
        var chunks = [], data;
        res.on('data', function (chunk) {
            chunks.push(chunk);
        });
        res.on('end', function () {
            data = iconv.decode(Buffer.concat(chunks), 'gb2312');
            console.log(data);
            var arr = data.match(/&nbsp;.*<\/td><td>/gi)[0].split('</td>');
            var student = [];
            for (var i = 0; i < arr.length; i++) {
                var exg = arr[i].match(/&nbsp;(.*)/i);
                student.push(exg ? exg[1] : 'null');
            }
            console.log(student);
        });
    });



