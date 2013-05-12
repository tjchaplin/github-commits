var should = require("should");
var Enumerable = require("../lib/Enumerable.js");

describe("When using AsyncForEach", function(){
	this.timeout(10000);

	it("Should be able to execute an asnync action on each item in an array", function(onComplete){
		var numberProcessed = 0;
		var itemsToProcess = [1,2,3];

		var longProcess = function(item, onLongProcessComplete){
			setTimeout(function(){
				numberProcessed++;
				onLongProcessComplete();
			},1000)
		};

		Enumerable.FromArray(itemsToProcess)
				.AsyncForEach(longProcess,function(results){
					numberProcessed.should.be.equal(itemsToProcess.length);
					onComplete();
				});

	});

	it("Should be able to execute an asnync action on each item in an array and call back to the results", function(onComplete){
		var itemsToProcess = [1,2,3];

		var itemPlusOneAsyncMethod = function(item, onLongProcessComplete){
			setTimeout(function(){ onLongProcessComplete(++item);} , 1000);
		};

		Enumerable.FromArray(itemsToProcess)
				.AsyncForEach(itemPlusOneAsyncMethod,function(results){
					var sum = Enumerable.FromArray(results).Sum();
					sum.should.be.equal(9);
					onComplete();
				});

	});

	it("Should be able to get index of async item for each item", function(onComplete){
		var itemsToProcess = [1,2,3];

		var longProcess = function(item, onLongProcessComplete,index){
			setTimeout(function(){
				item.should.be.equal(itemsToProcess[index])
				onLongProcessComplete();
			},1000)
		};

		Enumerable.FromArray(itemsToProcess)
				.AsyncForEach(longProcess,
								function(results){ 
									onComplete();
								});

	});
});