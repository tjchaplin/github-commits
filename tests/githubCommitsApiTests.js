var should = require('should');
var gitCommits = require("../lib/githubCommitsApi.js");
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


describe('When using git api',function(){
	this.timeout(60000);
	

	it("should be able to get repositories based on a username",function(onComplete){
		var gitConnection = gitCommits.Connect();

		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleGitRepositories.json",callBack);
		};	

		gitConnection.getRepositories("tjchaplin",function(data){
			data.should.not.equal(undefined);
			onComplete();			
		});
	});
	
	it("should be able to get repositories based on a user owner",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleGitRepositories.json",callBack);
		};	
		gitConnection.getRepositories({name:"tjchaplin",type:"users"},function(data){
			data.should.not.equal(undefined);
			onComplete();			
		});
	});
	
	it("should be able to get repositories based on an org owner",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleGitRepositories.json",callBack);
		};	
		gitConnection.getRepositories({name:"github",type:"orgs"},function(data){
			data.should.not.equal(undefined);
			onComplete();			
		});
	});

	
	it("should be able to get commits by day",function(onComplete){

		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
		};	

		gitConnection.getRepositoryDailyCommits("tjchaplin",{},function(data){
	 		data.length.should.equal(364);
			onComplete();			
		});
	});


	it("should be able to get commits given a since date ",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
		};	
		var options = {sinceDate:new Date("2013-05-07T00:00:00Z")};
		gitConnection.getRepositoryDailyCommits("tjchaplin",options,function(data){
	 		data.length.should.equal(5);
			onComplete();			
		});

	});

	it("should be able to get commits given an until date ",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
		};	
		var options = {untilDate:new Date("2013-05-06T00:00:00Z")};
		gitConnection.getRepositoryDailyCommits("tjchaplin",options,function(data){
	 		data.length.should.equal(359);
			onComplete();			
		});

	});


	it("should be able to get commits given a since and until date ",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleCommitActivity.json",callBack);
		};	
		var options = {sinceDate:new Date("2013-05-09T00:00:00Z"),untilDate:new Date()};
		gitConnection.getRepositoryDailyCommits("tjchaplin",options,function(data){
	 		data.length.should.equal(3);
			onComplete();			
		});

	});

	it("should be able to get commit count given a repository",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.getRepositoryDailyCommits = function(repository, options, callback){
			callback([{date: new Date(),commitCount: 1},
					  {date: new Date(),commitCount: 1}]);
		};	

		gitConnection.updateRepositoryCommitCount({name:"repository"},{},function(repository){
	 		repository.numberOfCommits.should.equal(2);
			onComplete();			
		});

	});

	it("should be able to sum all repository commits",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.getRepositoryDailyCommits = function(repository, options, callback){
			callback([{date: new Date(),commitCount: 1},
					  {date: new Date(),commitCount: 1}]);
		};	
		var repositories = [{name:"repository1"},{name:"repository2"}]
		gitConnection.sumAllRepositoryCommits(repositories,{},function(repositories){
	 		repositories[0].numberOfCommits.should.equal(2);
	 		repositories[1].numberOfCommits.should.equal(2);
			onComplete();			
		});

	});
	
});

