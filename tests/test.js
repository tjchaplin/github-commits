var should = require('should');
var gitCommits = require("../lib/GitHubCommitsApi.js");

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

		gitConnection.getOwnerRepositories("tjchaplin",function(data){
			data.should.not.equal(undefined);
			onComplete();			
		});
	});
	
	it("should be able to get repositories based on a user",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleGitRepositories.json",callBack);
		};	
		gitConnection.getOwnerRepositories({name:"tjchaplin",type:"users"},function(data){
			data.should.not.equal(undefined);
			onComplete();			
		});
	});
	
	it("should be able to get repositories based on an org",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleGitRepositories.json",callBack);
		};	
		gitConnection.getOwnerRepositories({name:"github",type:"orgs"},function(data){
			data.should.not.equal(undefined);
			onComplete();			
		});
	});
	
	it("should be able to get number of repository commits",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.makeRequest = function(url,callBack){
			var sampleGitRepository = loadTestData("sampleGitCommits.json",callBack);
		};	
		gitConnection.getRepositoryCommits({name:"developer.github.com",owner:"github"},{},function(data){
			data.numberOfCommits.should.be.greaterThan(0);
			onComplete();			
		});
	});

	it("should be able to total commits for all user repositories",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.getOwnerRepositories = function(owner,callBack){
			var sampleGitRepository = loadTestData("sampleRepositories.json",callBack);
		};	
		gitConnection.getRepositoryCommits = function(repository, options ,callBack){
			var sampleGitRepository = loadTestData("sampleCommits.json",callBack);
		};	
		gitConnection.getAllRepositoryCommits({name:"tjchaplin",type:"users"},{},function(repositories){
			repositories[0].numberOfCommits.should.be.greaterThan(0);
			onComplete();			
		});
	});

	it("should be able to total commits for all repositories in an org",function(onComplete){
		var gitConnection = gitCommits.Connect();
		gitConnection.getOwnerRepositories = function(owner,callBack){
			var sampleGitRepository = loadTestData("sampleRepositories.json",callBack);
		};	
		gitConnection.getRepositoryCommits = function(repository, options ,callBack){
			var sampleGitRepository = loadTestData("sampleCommits.json",callBack);
		};	
		gitConnection.getAllRepositoryCommits({name:"github",type:"orgs"},{},function(repositories){
			repositories[0].numberOfCommits.should.be.greaterThan(0);
			onComplete();			
		});
	});
	
	it("should be able to add options that have a start date",function(){
		var gitConnection = gitCommits.Connect();
		var sinceDate = "2013-03-08T23:03:20Z";
		var untilDate = "2013-03-08T23:03:20Z";

		var optionString = gitConnection.optionsToQueryString({sinceDate:sinceDate,
										 			   		   untilDate : untilDate});

		optionString.indexOf(sinceDate).should.be.greaterThan(0);
	});
	
	it("should return empty option string if none defined",function(){
		var gitConnection = gitCommits.Connect();
		var sinceDate = "2013-03-08T23:03:20Z";
		var untilDate = "2013-03-08T23:03:20Z";

		var optionString = gitConnection.optionsToQueryString();
		
		optionString.should.be.equal("");
	});
	
	it("when since date is the only option should only return it in the option string",function(){
		var gitConnection = gitCommits.Connect();
		var sinceDate = "2013-03-08T23:03:20Z";
		var optionString = gitConnection.optionsToQueryString({sinceDate:sinceDate});
		
		optionString.should.be.equal("?since="+sinceDate);
	});

	it("when until date is the only option should only return it in the option string",function(){
		var gitConnection = gitCommits.Connect();
		var untilDate = "2013-03-08T23:03:20Z";
		var optionString = gitConnection.optionsToQueryString({untilDate:untilDate});
		
		optionString.should.be.equal("?until="+untilDate);
	});
});

