var should = require('should');
var Enumerable = require("../");

describe('When using Select',function(){
	var array = [{a:"1"},{a:"2"},{a:"3"}];
	var enumerable = Enumerable.FromArray(array);

	it("should return empty enumerable when no selector",function(){
		var result = enumerable.Select();
		result.Any().should.be.false;
	});

	it("when using a property selector should return enumerable with selected",function(){
		var result = enumerable.Select(function(item){return item.a}).ToArray();
		result.length.should.be.eql(3);
		for (var i = 0; i < array.length; i++) {
			(array[i].a == result[i]).should.be.true;
		};
	});

	it("can be combined with enumerable functions",function(){
		var result = enumerable.Where(function(item){return true;})
							   .Select(function(item){return item.a})
							   .Count();	

		result.should.be.eql(3);
	});

});