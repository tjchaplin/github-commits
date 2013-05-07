var should = require('should');
var Enumerable = require("../");

describe('When iterating with a ForEach',function(){
	var array = [1,2,3];
	var enumerable = Enumerable.FromArray(array);

	it("should return enumerable if no paramaters",function(){
		var result = enumerable.ForEach().ToArray();
		result.length.should.be.equal(3);
	});

	it("should perform action on each item in array",function(){
		var sum = 0;
		enumerable.ForEach(function(item){ return sum+= item});
		sum.should.be.equal(6);
	});

});