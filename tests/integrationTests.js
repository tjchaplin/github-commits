var should = require('should');
var gitHubCommits = require("../lib/github-commits.js");
var enumerable = require("yaenumerable");

var fs = require('fs');

describe('When using git api',function(){
	this.timeout(60000);
	it("should be able to make a request",function(onComplete){
		var gitConnection = gitHubCommits.Connect();
		gitConnection.makeRequest("https://api.github.com/users/tjchaplin",function(data){
			data.should.not.equal(undefined);
			onComplete();
		});
	});
	
	// it("should be able to get repositories based on a username",function(onComplete){
	// 	var gitConnection = gitHubCommits.Connect();
	// 	gitConnection.getOwnerRepositories("tjchaplin",function(data){
	// 		data.should.not.equal(undefined);
	// 		onComplete();			
	// 	});
	// });
	
	// it("should be able to get repositories based on a user",function(onComplete){
	// 	var gitConnection = gitHubCommits.Connect();
	// 	gitConnection.getOwnerRepositories({name:"tjchaplin",type:"users"},function(data){
	// 		data.should.not.equal(undefined);
	// 		onComplete();			
	// 	});
	// });
	
	
	// it("should be able to get number of repository commits",function(onComplete){
	// 	var gitConnection = gitHubCommits.Connect();
	// 	gitConnection.getRepositoryCommits({name:"developer.github.com",owner:"github"},{},function(data){
	// 		data.numberOfCommits.should.be.greaterThan(0);
	// 		onComplete();			
	// 	});
	// });

	// it("should be able to total commits for all user repositories",function(onComplete){
	// 	var gitConnection = gitHubCommits.Connect();
	// 	gitConnection.getAllRepositoryCommits({name:"tjchaplin",type:"users"},{},function(repositories){
	// 		repositories[0].numberOfCommits.should.be.greaterThan(0);
	// 		onComplete();			
	// 	});
	// });

	// it("should be able to filter commits by a start and end date",function(onComplete){
	// 	var sinceDate = "2013-05-05T00:00:00Z";
	// 	var untilDate = "2013-05-05T23:59:59Z";
	// 	var gitConnection = gitHubCommits.Connect();
	// 	var optionFilters = {sinceDate:sinceDate,untilDate : untilDate};
	// 	var owner = {name:"tjchaplin",type:"users"}
	// 	gitConnection.getAllRepositoryCommits(owner,optionFilters,function(repositories){

	// 		var result = enumerable.FromArray(repositories)
	// 							.Where(function(repository){return repository.name == "YAEnumerable"})
	// 							.First();

	// 		result.numberOfCommits.should.be.equal(19);
	// 		onComplete();			
	// 	});
	// });

	//-----------------------------
	//Explict org tests
	//-----------------------------
	// it("should be able to get repositories based on an org",function(onComplete){
	// 	var gitConnection = gitHubCommits.Connect();
	// 	gitConnection.getOwnerRepositories({name:"github",type:"orgs"},function(data){
	// 		data.should.not.equal(undefined);
	// 		onComplete();			
	// 	});
	// });

	// it("should be able to total commits for all repositories in an org",function(onComplete){
	// 	var gitConnection = gitHubCommits.Connect();
	// 	gitConnection.getAllRepositoryCommits({name:"github",type:"orgs"},{},function(repositories){
	// 		repositories[0].numberOfCommits.should.be.greaterThan(0);
	// 		onComplete();			
	// 	});
	// });
});

