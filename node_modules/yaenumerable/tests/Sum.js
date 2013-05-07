var should = require('should');
var Enumerable = require("../");

describe('When using Sum',function(){
	var array = [1,2,3];
	var enumerable = Enumerable.FromArray(array);

	it("should sum all items if no object selector paramaters",function(){
		var result = enumerable.Sum();
		result.should.be.equal(6);
	});

	it("should sum all items based on selector paramaters",function(){
		var objectArray = [{a:1},{a:2},{a:3}];
		var result = Enumerable.FromArray(objectArray)
							   .Sum(function(item){return item.a;});
							   
		result.should.be.equal(6);
	});

});