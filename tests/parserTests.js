var should = require('should');
var parser = require("../lib/parser.js");

describe('When parsing',function(){
	
	it("should return owner object given a user owner object",function(onComplete){
		var owner = {name:"tjchaplin",type:"users"};
		var result = parser.parseOwner(owner);

		result.name.should.be.equal(owner.name);
		result.type.should.be.equal(owner.type);

		onComplete();
	});

	it("should return owner object given a org owner object",function(onComplete){
		var owner = {name:"github",type:"orgs"};
		var result = parser.parseOwner(owner);

		result.name.should.be.equal(owner.name);
		result.type.should.be.equal(owner.type);

		onComplete();
	});
	
	it("given a string should return owner object with name as the string",function(onComplete){
		var name = "tjchaplin";
		var result = parser.parseOwner(name);

		result.name.should.be.equal(name);
		result.type.should.be.equal("users");

		onComplete();
	});
	
});

