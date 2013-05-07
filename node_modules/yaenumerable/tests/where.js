var should = require('should');
var Enumerable = require("../");

describe('When using a Where condition',function(){
	var array = ["1","2","3"];
	var enumerable = Enumerable.FromArray(array);

	it("should return empty enumerable when no condition ",function(){
		var result = enumerable.Where();
		result.sequence.length.should.be.eql(0);
	});

	it("should return enumerable with all matching items when condition is met",function(){
		var result = enumerable.Where(function(item){return typeof item === "string"});
		result.sequence.length.should.be.eql(3);
	});

	it("should return empty enumerable when condition is not met",function(){
		var result = enumerable.Where(function(item){return false});
		result.sequence.length.should.be.eql(0);
	});

});