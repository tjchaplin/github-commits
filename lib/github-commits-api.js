var async = require("async");
var Enumerable = require("yaenumerable");
var dateExtensions = require("./dateExtensions.js");
var GithubEnumerable = require("./github-commits-enumerable.js");
var GithubRequestBuilder = require("./github-request-builder.js");

"use strict";

var GitHubCommitsApi = module.exports = exports = function(requestClient,apiUrl){

	this.requests = [];
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

	if(!repositories){
		var request = self.githubRequestBuilder.forRepositories();
		self.requests.push(request);
		return self;
	}

	var request = function(onComplete){onComplete(null,repositories);};
	self.requests.push(request);

	return self;		
};

GitHubCommitsApi.prototype.repositoryCommits = function(conditions){
	var self = this;

	var repositoryCommitRequest = self.githubRequestBuilder.forRepositoryCommits(conditions);
	var request = function(repositories,onComplete){
		Enumerable.FromArray(repositories)
				.AsyncForEach(repositoryCommitRequest, 
							function(updatedRepositories){
								onComplete(null, updatedRepositories);
							});
	};
	
	self.requests.push(request);
	return self;		
};

GitHubCommitsApi.prototype.currentWeekCommits = function(repositories){
	var self = this;

	var sinceDate = dateExtensions.getFirstSundayOfWeek(new Date());
	
	self.repositories(repositories);
	self.repositoryCommits({sinceDate:sinceDate});

	return new GithubEnumerable(self.requests);
};

GitHubCommitsApi.prototype.commitsUntil = function(untilDate,repositories){
	var self = this;
	
	self.repositories(repositories);
	self.repositoryCommits({untilDate:untilDate});

	return new GithubEnumerable(self.requests);
};

GitHubCommitsApi.prototype.commitsSince= function(sinceDate,repositories){
	var self = this;

	self.repositories(repositories);
	self.repositoryCommits({sinceDate:sinceDate});

	return new GithubEnumerable(self.requests);
};

GitHubCommitsApi.prototype.commitsBetween = function(sinceDate,untilDate,repositories){
	var self = this;

	self.repositories(repositories);
	self.repositoryCommits({sinceDate:sinceDate,untilDate:untilDate});

	return new GithubEnumerable(self.requests);
};