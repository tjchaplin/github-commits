var should = require('should');
var Enumerable = require("../");

describe('When selecting Any',function(){
	var array = ["1","2","3"];
	var enumerable = Enumerable.FromArray(array);

	it("should return false when no condition ",function(){
		var result = enumerable.Any(function(item){return false;});
		result.should.be.false;
	});

	it("should return true when can match an item",function(){
		var result = enumerable.Any(function(item){return item == "1"});
		result.should.be.true;
	});

	it("should return false when condition is not met for all items",function(){
		var result = enumerable.Any(function(item){return false;});
		result.should.be.false;
	});

	it("can be combined with Where condition",function(){
		var result = enumerable.Where(function(item){return item == "1";})
							   .Any();
		result.should.be.true;
	});

});