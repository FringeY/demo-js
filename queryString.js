function Query(){}
Query.prototype.queryString = function (name){
	var that = this;
	var array = this.array || (function (){
		var queryArray = location.search.substr(1).split('&');
		var keyArray = [];
		var valueArray = [];
		that.query = {};
		for(var i = 0;i < queryArray.length;i++){
			that.query[queryArray[i].split('=')[0]] = queryArray[i].split('=')[1];
		}
		return that.query;
	}());
	return array[name];
}
var query = new Query();