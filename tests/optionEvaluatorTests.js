var should = require('should');
var validator = require("../lib/validator.js");

describe('When using git api',function(){
	
	it("when sincedate is the only option should return true if date is greater than or equal",function(){
		var sinceDate = new Date("2013-03-08T23:03:20Z");

		var value = {date: new Date()};
		var options = {sinceDate:sinceDate};
		var result = validator.hasValidDate(options,value);
		
		result.should.be.equal(true);
	});

	it("when sincedate is the only option should return false if date is less than",function(){
		var sinceDate = new Date("2013-03-08T23:03:20Z");

		var value = {date: new Date(sinceDate)};
		value.date.setDate(value.date.getDate()-1);

		var options = {sinceDate:sinceDate};
		var result = validator.hasValidDate(options,value);
		
		result.should.be.equal(false);
	});

	it("when until date is the only option should return true if date is less than or equal",function(){
		var untilDate = new Date("2013-03-08T23:03:20Z");

		var value = {date: new Date(untilDate)};
		value.date.setDate(value.date.getDate()-1);

		var options = {untilDate:untilDate};
		var result = validator.hasValidDate(options,value);
		
		result.should.be.equal(true);
	});

	it("when until date is the only option should return false if date is greater than",function(){
		var untilDate = new Date("2013-03-08T23:03:20Z");

		var value = {date: new Date()};
	 	var options = {untilDate:untilDate};
		var result = validator.hasValidDate(options,value);
		
		result.should.be.equal(false);
	});
});

