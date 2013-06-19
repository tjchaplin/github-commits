var should = require('should');
var dateExtensions = require("../lib/dateExtensions.js");
var GitCommits = require("../lib/githubCommitsApi.js");
var enumerable = require("yaenumerable");
var async = require('async');

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

var fakeRequestClient = function(mockRequst){
	var self = this;

	self.request = function(url,callback){
		var fileName = mockRequst[url];

		if(!fileName)
			return callback();

		loadTestData(fileName,function(data){

			callback(data);		
		});
	};
	return self;
};

describe('When getting current week commits',function(){
	it("should be able to get commits",function(onComplete){

		var mockRequst={};
		var expectedRequestUrl = "https://api.github.com/repos/tjchaplin/scarlet/commits" + "?since="+ dateExtensions.getFirstSundayOfWeek(new Date());
		mockRequst[expectedRequestUrl] = "sampleGitCommits.json";

		var gitConnection = new GitCommits(new fakeRequestClient(mockRequst));
		gitConnection.forUser("tjchaplin")							
					.currentWeekCommits([{name:"scarlet"}])
					.toArray(function(repositories){
						repositories[0].commitCount.should.eql(30);
						onComplete();
					});
	});
});

describe('When getting current week commits',function(){
	it("should be able to sum commits",function(onComplete){

		var mockRequst={};
		var expectedRequestUrl = "https://api.github.com/repos/tjchaplin/scarlet/commits" + "?since="+ dateExtensions.getFirstSundayOfWeek(new Date());
		mockRequst[expectedRequestUrl] = "sampleGitCommits.json";

		var gitConnection = new GitCommits(new fakeRequestClient(mockRequst));
		gitConnection.forUser("tjchaplin")							
					.currentWeekCommits([{name:"scarlet"}])
					  .sum(function(repository){
					  		return repository.commitCount;
					  	}
					  	,function(sum){
					  		sum.should.be.eql(30);
							onComplete();
					  });
	});
});

describe('When getting commits since',function(){
	it("should be able to get commits",function(onComplete){

		var mockRequst={};
		var sinceDate = new Date();
		var expectedRequestUrl = "https://api.github.com/repos/tjchaplin/scarlet/commits" + "?since="+sinceDate;
		mockRequst[expectedRequestUrl] = "sampleGitCommits.json";

		var gitConnection = new GitCommits(new fakeRequestClient(mockRequst));
		gitConnection.forUser("tjchaplin")							
					.commitsSince(sinceDate,[{name:"scarlet"}])
					.toArray(function(repositories){
						repositories[0].commitCount.should.eql(30);
						onComplete();
					});
	});
});

describe('When getting commits since',function(){
	it("should be able to sum commits",function(onComplete){

		var mockRequst={};
		var sinceDate = new Date();
		var expectedRequestUrl = "https://api.github.com/repos/tjchaplin/scarlet/commits" + "?since="+sinceDate;
		mockRequst[expectedRequestUrl] = "sampleGitCommits.json";

		var gitConnection = new GitCommits(new fakeRequestClient(mockRequst));
		gitConnection.forUser("tjchaplin")							
					.commitsSince(sinceDate,[{name:"scarlet"}])
					  .sum(function(repository){
					  		return repository.commitCount;
					  	}
					  	,function(sum){
					  		sum.should.be.eql(30);
							onComplete();
					  });
	});
});

describe('When getting commits until',function(){
	it("should be able to get commits",function(onComplete){

		var mockRequst={};
		var untilDate = new Date();
		var expectedRequestUrl = "https://api.github.com/repos/tjchaplin/scarlet/commits" + "?until="+untilDate;
		mockRequst[expectedRequestUrl] = "sampleGitCommits.json";

		var gitConnection = new GitCommits(new fakeRequestClient(mockRequst));
		gitConnection.forUser("tjchaplin")							
					.commitsUntil(untilDate,[{name:"scarlet"}])
					.toArray(function(repositories){
						repositories[0].commitCount.should.eql(30);
						onComplete();
					});
	});
});

describe('When getting commits until',function(){
	it("should be able to sum commits",function(onComplete){

		var mockRequst={};
		var untilDate = new Date();
		var expectedRequestUrl = "https://api.github.com/repos/tjchaplin/scarlet/commits" + "?until="+untilDate;
		mockRequst[expectedRequestUrl] = "sampleGitCommits.json";

		var gitConnection = new GitCommits(new fakeRequestClient(mockRequst));
		gitConnection.forUser("tjchaplin")							
					.commitsUntil(untilDate,[{name:"scarlet"}])
					  .sum(function(repository){
					  		return repository.commitCount;
					  	}
					  	,function(sum){
					  		sum.should.be.eql(30);
							onComplete();
					  });
	});
});

describe('When getting commits until',function(){
	it("should be able to get commits",function(onComplete){

		var mockRequst={};
		var sinceDate = new Date();
		var untilDate = new Date();
		var expectedRequestUrl = "https://api.github.com/repos/tjchaplin/scarlet/commits" + "?since="+sinceDate+"&until="+untilDate;
		mockRequst[expectedRequestUrl] = "sampleGitCommits.json";

		var gitConnection = new GitCommits(new fakeRequestClient(mockRequst));
		gitConnection.forUser("tjchaplin")							
					.commitsBetween(sinceDate,untilDate,[{name:"scarlet"}])
					.toArray(function(repositories){
						repositories[0].commitCount.should.eql(30);
						onComplete();
					});
	});
});

describe('When getting commits until',function(){
	it("should be able to sum commits",function(onComplete){

		var mockRequst={};
		var sinceDate = new Date();
		var untilDate = new Date();
		var expectedRequestUrl = "https://api.github.com/repos/tjchaplin/scarlet/commits" + "?since="+sinceDate+"&until="+untilDate;
		mockRequst[expectedRequestUrl] = "sampleGitCommits.json";

		var gitConnection = new GitCommits(new fakeRequestClient(mockRequst));
		gitConnection.forUser("tjchaplin")							
					.commitsBetween(sinceDate,untilDate,[{name:"scarlet"}])
					  .sum(function(repository){
					  		return repository.commitCount;
					  	}
					  	,function(sum){
					  		sum.should.be.eql(30);
							onComplete();
					  });
	});
});
