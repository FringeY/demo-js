var Promise = function (fn) {
    if (typeof fn !== 'function') {
        return fn;
    }
    var promise = this;
    promise._state = 0;
    promise._value;
    promise._reason;
    promise._callbacks = [];
    var resolve = function (data) {
        promise._state = 1;
        promise._value = data;
        promise._exec(promise);
    };
    var reject = function (err) {
        promise._state = 2;
        promise._reason = err;
        promise._exec(promise);
    };
    fn(resolve, reject);
}

Promise.prototype = {
    resolve: function (promise, x) {
        if (promise === x) {
            return;
        }
        promise._value = x;
        promise._exec(promise);
    },
    reject: function (promise, x) {
        promise._reason = x;
        promise._exec(promise);
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
        if (promise._state === 0) {
            return;
        }

        setTimeout(function () {
            while (promise._callbacks.length) {
                var fn = promise._callbacks.shift();
                try {
                    var value = (promise._state === 1 ? 
                        (fn.fulfilled || function (x) {return x}) :
                        (fn.rejected || function (x) {return x})
                        )(promise._value);
                } catch (e) {
                    promise.reject(fn.then, e);
                    continue;
                } 
                promise.resolve(fn.then, value);
            }
        }, 0);
    }
}






