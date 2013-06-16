var should = require('should');
var githubDailyCommitCount = require("../lib/githubDailyCommitCount.js");
var enumerable = require("yaenumerable");

var fs = require('fs');
 
var loadTestData = function(fileName,onLoaded){
	var file = __dirname + "/"+fileName;
	fs.readFile(file, 'utf8', function (err, data) {
	  if (err) {
	    console.log('Error: ' + err);
	    return;
	  }
	  data = JSON.parse(data);
	  onLoaded(data);
	});
}

describe('When using githubDailyCommitCount',function(){
	
	it("should be able to get all commits by day",function(onComplete){
		githubDailyCommitCount.httpsRequest = function(requestUrl, callback){
			loadTestData("sampleCommitActivity.json",function(commitStats){
				callback(commitStats);
			});
		};

		var repositoryRequest = {owner:"",name:""};
		githubDailyCommitCount.getDailyCommits(repositoryRequest, function(dailyCommits){
			dailyCommits.length.should.equal(364);
			onComplete();			
		});
	});

	it("should be able to sum commits ",function(onComplete){
		githubDailyCommitCount.httpsRequest = function(requestUrl, callback){
			loadTestData("sampleCommitActivity.json",function(commitStats){
				callback(commitStats);
			});
		};

		var repositoryRequest = {owner:"",name:""};
		githubDailyCommitCount.sumOfDailyCommits(repositoryRequest, function(sumOfDailyCommits){
			sumOfDailyCommits.should.equal(151);
			onComplete();			
		});

	});

	it("should be able to sum commits given a since date ",function(onComplete){
		loadTestData("sampleCommitActivity.json",function(commitStats){
			var options = {sinceDate:new Date("2013-05-07T00:00:00Z")};
			var dailyCommits = githubDailyCommitCount.dailyCommits(commitStats,options);
			
			var sumOfCommits = enumerable.FromArray(dailyCommits)
										.Sum(function(dailyCommit){ return dailyCommit.commitCount;});
			
			sumOfCommits.should.equal(2);
			onComplete();
		});

	});

	it("should be able to sum commits given an until date ",function(onComplete){
		loadTestData("sampleCommitActivity.json",function(commitStats){
			var options = {untilDate:new Date("2013-05-06T00:00:00Z")};
			var dailyCommits = githubDailyCommitCount.dailyCommits(commitStats,options);
			
			var sumOfCommits = enumerable.FromArray(dailyCommits)
										.Sum(function(dailyCommit){ return dailyCommit.commitCount;});
			
			sumOfCommits.should.equal(149);
			onComplete();
		});
	});

	it("should be able to sum commits given a since and until date ",function(onComplete){
		loadTestData("sampleCommitActivity.json",function(commitStats){
			var options = {sinceDate:new Date("2013-01-07T00:00:00Z"),untilDate:new Date()};
			var dailyCommits = githubDailyCommitCount.dailyCommits(commitStats,options);
			
			var sumOfCommits = enumerable.FromArray(dailyCommits)
										.Sum(function(dailyCommit){ return dailyCommit.commitCount;});
			
			sumOfCommits.should.equal(25);
			onComplete();
		});

	});
	
});

