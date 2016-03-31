var http = require('http'),
    iconv = require('iconv-lite'),
    urlencode = require('urlencode'),
    mysql = require('mysql'),
    link = 'http://jwzx.cqupt.edu.cn/pubBjStu.php?searchKey=',
    time = 0,
    range = [{
        start: 2015210000,
        end: 2015220010
    }];

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '182617',
  database : 'test'
});

connection.connect(function (err) {
    if (err) {
        console.log(err.message);
    }
});

function control (time) {
    if (time == range.length) {
        connection.end();
        return false;
    }
    getStuInfo(range[time].start, range[time].end, getStuInfo);    
}

function getStuInfo (start, end, callback) {
    if (start > end) {
        control(++time);
        return false;
    }
    http.get(link + start, function (res) {
        var chunks = [], data;
        res.on('data', function (chunk) {
            chunks.push(chunk);
        });
        res.on('end', function () {
            data = iconv.decode(Buffer.concat(chunks), 'gb2312');
            var arr = data.match(/&nbsp;.*<\/td><td>/gi)[0].split('</td>');
            var student = [];
            for (var i = 0; i < arr.length; i++) {
                var exg = arr[i].match(/&nbsp;(.*)/i);
                student.push(exg ? exg[1] : 'null');
            }
            if (!student[0]) {
                callback(start+1, end, callback);
                return false;
            }
            
            var data = {stu_id: student[0], stu_name: student[1], stu_sex: student[2].slice(0,1) == '男' ? 1 : 0, stu_class: student[3], stu_zhuanye: student[4], stu_xueyuan: student[5]};
            connection.query('INSERT INTO student SET ?', data, function(err, result) {
                if (err) {
                    console.log(err.message);
                }
                console.log('insert' + student[0]);
                callback(start+1, end, callback);
            });
        });
    });
}

control(time);

