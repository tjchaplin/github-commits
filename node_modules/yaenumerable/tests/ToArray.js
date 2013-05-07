var should = require('should');
var Enumerable = require("../");

describe('When using ToArray',function(){
		var array = ["1","2","3"];
	var enumerable = Enumerable.FromArray(array);

	it("should return array",function(){
		var result = enumerable.ToArray();
		result.length.should.be.eql(3);
		for (var i = 0; i < array.length; i++) {
			(array[i] == result[i]).should.be.true;
		};
	});

	it("can be combined with enumerable functions",function(){
		var result = enumerable.Where(function(item){return item == "1"})
							   .Count();	

		result.should.be.eql(1);
	});

});