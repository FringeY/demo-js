// 简单extend扩展
// 不考虑深层拷贝
// 实现如下方法 extend(obj1,obj2,obj3);

var extend = (function () {
    var Extend = function () {

    };

    Extend.prototype.extend = function () {
        var src, copy, options,
            i = 1,
            target = arguments[0] || {},
            length = arguments.length;

        // 处理特殊情况 extend('hello', 'xxx');
        if (typeof target !== 'object' && typeof target !== 'function') {

        }

        if (; i < length; i++) {
            if (options = arguments[i]) {}
            for (var name in options) {
                src = target[name];
                copy = options[name];

                if (target === copy) {
                    continue;
                }

                target[name] = copy;
            }
        }
    };

    var e = new Extend();
    retrun e.extend;
})();