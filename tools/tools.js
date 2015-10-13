var Tools = function () {
    return new Tools.prototype.init();
};

Tools.prototype = {
    init: function () {
        return this;
    },
    name: function () {
        // this.age = 13;
        return this;
    },
    age: 20
}



Tools.prototype.init.prototype = Tools.prototype;
