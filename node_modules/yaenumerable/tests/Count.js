var should = require('should');
var Enumerable = require("../");

describe('When using Count',function(){
		var array = ["1","2","3"];
	var enumerable = Enumerable.FromArray(array);

	it("should return number of items",function(){
		var result = enumerable.Count();
		result.should.be.eql(3);
	});

	it("should return 0 if no items",function(){
		var enumerable = Enumerable.FromArray([]);
		var result = enumerable.Count();
		result.should.be.eql(0);
	});

	it("can be combined with enumerable functions",function(){
		var result = enumerable.Where(function(item){return item == "1"})
							   .Count();	

		result.should.be.eql(1);
	});

});