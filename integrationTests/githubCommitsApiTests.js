var should = require('should');
var GitHubCommits = require("../lib/github-commits.js");

var fs = require('fs');

describe('When using git api',function(){
	this.timeout(60000);
	var gitHubCommits = new GitHubCommits();

	// it("should be able to make a repository request",function(onComplete){
	// 	console.log(GitHubCommits);
	// 	var gitHubCommits = GitHubCommits();

	// 	gitHubCommits.forUser("tjchaplin")
	// 				.repositories()
	// 				.toArray(function(repositories){
	// 					console.log(repositories);
	// 					onComplete();
	// 				});
	// });
	
	it("should be able to make a repository request",function(onComplete){

		gitHubCommits.forUser("tjchaplin")
					.currentWeekCommits()
					.toArray(function(repositories){
						console.log(repositories);
						onComplete();
					},function(error){
						console.log(error);
						onComplete();
					});
	});
		it("should be able to make a repository request",function(onComplete){

		gitHubCommits.forUser("tjchaplin")
					.currentWeekCommits()
					.toArray(function(repositories){
						onComplete();
					});
					
			setTimeout(function(){
				console.log("timeout");
				onComplete();
			},2000)
	});
	// it("should be able to make a repository request",function(onComplete){


	// 	gitHubCommits.forUser("tjchaplin")
	// 				.currentWeekCommits()
	// 				.sumCommits(function(repositories){
	// 						//console.log(repositories);
	// 						onComplete();
	// 				});
	// });

	// it("should be able to get repositories based on a username",function(onComplete){
	// 	var gitConnection = gitHubCommits.Connect();
	// 	gitConnection.getRepositories("tjchaplin",function(data){
	// 		data.should.not.equal(undefined);
	// 		onComplete();			
	// 	});
	// });
	
	// it("should be able to get repositories based on a user",function(onComplete){
	// 	var gitConnection = gitHubCommits.Connect();
	// 	gitConnection.getRepositories({name:"tjchaplin",type:"users"},function(data){
	// 		data.should.not.equal(undefined);
	// 		onComplete();			
	// 	});
	// });	
	
	// it("should be able to get number of repository commits",function(onComplete){
	// 	var gitConnection = gitHubCommits.Connect();
	// 	gitConnection.updateRepositoryCommitCount({name:"developer.github.com",owner:"github"},{},function(data){
	// 		data.numberOfCommits.should.be.above(-1);
	// 		onComplete();			
	// 	});
	// });

	// it("should be able to total commits for all user repositories",function(onComplete){
	// 	var gitConnection = gitHubCommits.Connect();
	// 	gitConnection.getAllRepositoryCommits({name:"tjchaplin",type:"users"},{},function(repositories){
	// 		repositories[0].numberOfCommits.should.be.above(-1);
	// 		onComplete();			
	// 	});
	// });

	// it("should be able to sum all commits when filtered commits by a start and end date",function(onComplete){
	// 	var sinceDate = new Date("2013-05-05T00:00:00Z");
	// 	var untilDate = new Date("2013-05-05T23:59:59Z");
	// 	var gitConnection = gitHubCommits.Connect();
	// 	var optionFilters = {sinceDate:sinceDate,untilDate : untilDate};
	// 	var owner = {name:"tjchaplin",type:"users"}
	// 	gitConnection.getAllRepositoryCommits(owner,optionFilters,function(repositories){
	// 		var result = enumerable.FromArray(repositories)
	// 							.Where(function(repository){return repository.name == "YAEnumerable"})
	// 							.First();

	// 		result.numberOfCommits.should.be.equal(18);
	// 		onComplete();			
	// 	});
	// });

// 	//-----------------------------
// 	//Explict org tests
// 	//-----------------------------
// 	// it("should be able to get repositories based on an org",function(onComplete){
// 	// 	var gitConnection = gitHubCommits.Connect();
// 	// 	gitConnection.getOwnerRepositories({name:"github",type:"orgs"},function(data){
// 	// 		data.should.not.equal(undefined);
// 	// 		onComplete();			
// 	// 	});
// 	// });

// 	// it("should be able to total commits for all repositories in an org",function(onComplete){
// 	// 	var gitConnection = gitHubCommits.Connect();
// 	// 	gitConnection.getAllRepositoryCommits({name:"github",type:"orgs"},{},function(repositories){
// 	// 		repositories[0].numberOfCommits.should.be.greaterThan(0);
// 	// 		onComplete();			
// 	// 	});
// 	// });

});

