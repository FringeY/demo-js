var Promise = function (fn) {
    if (typeof fn !== 'function') {
        return fn;
    }
    var promise = this;
    promise._state = 0;
    promise._value;
    promise._callbacks = [];
    fn(promise.resolve.bind(promise), promise.reject.bind(promise));
}

Promise.prototype = {
    resolve: function (data) {
        this._state = 1;
        this._value = data;
        this._exec(this);
    },
    reject: function (err) {
        this._state = 2;
        this._value = err;
        this._exec(this);
    },
    then: function (onFulfilled, onRejected) {
        var self = this;
        var promise = new Promise(function () {});

        self._callbacks.push({
            fulfilled: onFulfilled,
            rejected: onRejected,
            then: promise
        });
        
        return promise;
    },
    _exec: function (promise) {
        console.log(promise);
        if (promise._state === 0) {
            return;
        }

        setTimeout(function () {
            while (promise._callbacks.length) {
                var fn = promise._callbacks.shift();
                try {
                    (promise._state === 1 ? 
                        (fn.fulfilled || function (x) {return x}) : 
                        (fn.rejected || function (x) {return x})
                        )(promise._value, promise.resolve.bind(fn.then));
                } catch (e) {
                    promise.reject.bind(fn.then, e);
                    continue;
                } 
            }
        }, 0);
    }
}

var test = new Promise(function (resolve, reject) {
    setTimeout(function () {resolve(2);console.log(111)},2000);
});

test.then(function (value, resolve) {
    setTimeout(function () {resolve(3);console.log(value)},2000);
}).then(function (value, resolve) {
    resolve();
    console.log(value);
});
