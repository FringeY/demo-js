var autoMooc = (function () {

    var init = function () {
        findBlur(document);
        setInterval(function () {
            var isEnd = $('iframe').contents().find('.ans-job-icon').css('background-position');
            if (isEnd != '0% 0%') {
                $('#openlock').trigger('click');
            }
        }, 10000);
    }
    // 递归查找是否存在blur
    var findBlur = function (father) {
        // 获取传入节点子节点数
        var length = father.childNodes.length;

        // 去除TEXT_NODE
        if (father.nodeType == 3) {
            return false;
        }
        
        // 无子节点跳出循环
        if (length == 0) {
            return false;
        }
        
        // 寻找blur属性
        for (var i = 0; i < length; i++) {
            var son = father.childNodes[i];
            if (son.blur) {
                clearBlur(son);
                if (son.nodeName == 'FRAME') {
                    findBlur(son.contentWindow.document);
                } else {
                    findBlur(son);
                }
            } 
        }
    }
    // 清空blur
    var clearBlur = function (obj) {
        obj.blur = null;
        console.log('rm ' + obj.nodeName + ' blur');
        return true;
    }
    // test
    var test = function (father) {
        // 获取传入节点子节点数
        var length = father.childNodes.length;

        // 去除TEXT_NODE
        if (father.nodeType == 3) {
            return false;
        }
        
        // 无子节点跳出循环
        if (length == 0) {
            return false;
        }
        
        // 寻找blur属性
        for (var i = 0; i < length; i++) {
            var son = father.childNodes[i];
            console.log(1);
            if (son.blur) {
                console.log(son.nodeName);    
            } 
            if (son.nodeName == 'FRAME') {
                test(son.contentWindow.document);
            } else {
                test(son);
            }
        }
    }

    return {
        init: init,
        test: test
    };
})();

window.onload = function () {
    nopause.start(document);
}