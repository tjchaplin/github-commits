var async = require("async");
var Enumerable = require("yaenumerable");
var dateExtensions = require("./dateExtensions.js");
var GithubEnumerable = require("./github-commits-enumerable.js");
var GithubRequestBuilder = require("./github-request-builder.js");

(function(){
	"use strict";

	var GitHubCommitsApi = module.exports = exports = function(requestClient,apiUrl){

		this.requestClient = requestClient;
		this.githubRequestBuilder = new GithubRequestBuilder(apiUrl,requestClient);

		return this;
	};

	GitHubCommitsApi.prototype.forUser = function(userName){
		this.githubRequestBuilder.forUser(userName);
		return this;
	};

	GitHubCommitsApi.prototype.forOrg = function(orgName){
		this.githubRequestBuilder.forOrg(orgName);
		return this;
	};

	GitHubCommitsApi.prototype.repositories = function(repositories){
		var self = this;
		var request = function(onComplete){onComplete(null,repositories);};
		
		if(!repositories)
			request =  self.githubRequestBuilder.forRepositories();
		
		return  request;
	};

	GitHubCommitsApi.prototype.repositoryCommits = function(conditions){
		var self = this;

		var repositoryCommitRequest = self.githubRequestBuilder.forRepositoryCommits(conditions);
		var request = function(repositories,onComplete){
			if(!repositories)
				return onComplete(null,[]);

			if(repositories.length === 0)
				return onComplete(null, []);

			Enumerable.FromArray(repositories)
					.AsyncForEach(repositoryCommitRequest, 
								function(updatedRepositories){
									onComplete(null, updatedRepositories);
								});
		};
		
		return request;		
	};

	GitHubCommitsApi.prototype.currentWeekCommits = function(repositories){
		var self = this;
		var sinceDate = dateExtensions.getFirstSundayOfWeek(new Date());
		
		var repoositoryRequest = self.repositories(repositories);
		var commitRequest = self.repositoryCommits({sinceDate:sinceDate});

		return new GithubEnumerable([repoositoryRequest,commitRequest]);
	};

	GitHubCommitsApi.prototype.commitsUntil = function(untilDate,repositories){
		var self = this;
		
		var repoositoryRequest = self.repositories(repositories);
		var commitRequest = self.repositoryCommits({untilDate:untilDate});

		return new GithubEnumerable([repoositoryRequest,commitRequest]);
	};

	GitHubCommitsApi.prototype.commitsSince= function(sinceDate,repositories){
		var self = this;

		var repoositoryRequest = self.repositories(repositories);
		var commitRequest = self.repositoryCommits({sinceDate:sinceDate});

		return new GithubEnumerable([repoositoryRequest,commitRequest]);
	};

	GitHubCommitsApi.prototype.commitsBetween = function(sinceDate,untilDate,repositories){
		var self = this;

		var repoositoryRequest = self.repositories(repositories);
		var commitRequest = self.repositoryCommits({sinceDate:sinceDate,untilDate:untilDate});

		return new GithubEnumerable([repoositoryRequest,commitRequest]);
	};
})();