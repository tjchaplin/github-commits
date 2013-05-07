var should = require('should');
var Enumerable = require("../");

describe('When using Select',function(){
	var array = [{a:"1"},{a:"2"},{a:"3"}];
	var enumerable = Enumerable.FromArray(array);

	it("should return undefined when no items",function(){
		var enumerable = Enumerable.FromArray([]);
		var result = enumerable.First();
		should.equal(result,undefined);

	});

	it("should return first",function(){
		var result = enumerable.First();
		result.a.should.be.eql("1");
	});

	it("can be combined with enumerable functions",function(){
		var result = enumerable.Where(function(item){return item.a == "1"})
							   .First()

		result.a.should.be.eql("1");
	});
	it("when has a first selector should use",function(){
		var result = enumerable.First(function(item){return item.a;});

		result.should.be.eql("1");
	});

});