var async = require("async");
var Enumerable = require("yaenumerable");
var dateExtensions = require("./dateExtensions.js");
var GithubRequests = require("./githubRequests.js");

"use strict";

var GitHubCommitsApi = module.exports = exports = function(requestClient,apiUrl){

	this.requests = [];
	this.githubRequests = new GithubRequests(apiUrl,requestClient);

	return this;
};

GitHubCommitsApi.prototype.forUser = function(userName){
	this.githubRequests.forUser(userName);
	return this;
};

GitHubCommitsApi.prototype.forOrg = function(orgName){
	this.githubRequests.forOrg(orgName);
	return this;
};

GitHubCommitsApi.prototype.repositories = function(repositories){
	var self = this;

	if(!repositories){
		var request = self.githubRequests.repositoriesRequests();
		self.requests.push(request);
		return self;
	}

	var request = function(onComplete){onComplete(null,repositories);};
	self.requests.push(request);

	return self;		
};

GitHubCommitsApi.prototype.repositoryCommits = function(conditions){
	var self = this;

	var repositoryCommitRequest = self.githubRequests.RepositoryCommitsRequest(conditions);
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

	return self;
};

GitHubCommitsApi.prototype.commitsUntil = function(untilDate,repositories){
	var self = this;
	
	self.repositories(repositories);
	self.repositoryCommits({untilDate:untilDate});

	return self;
};

GitHubCommitsApi.prototype.commitsSince= function(sinceDate,repositories){
	var self = this;

	self.repositories(repositories);
	self.repositoryCommits({sinceDate:sinceDate});

	return self;
};

GitHubCommitsApi.prototype.commitsBetween = function(sinceDate,untilDate,repositories){
	var self = this;

	self.repositories(repositories);
	self.repositoryCommits({sinceDate:sinceDate,untilDate:untilDate});

	return self;
};

GitHubCommitsApi.prototype.toArray = function(onComplete){
	var self = this;

	self.requests.push(onComplete);
	executeRequests(self.requests);

	return self;
};

GitHubCommitsApi.prototype.sum = function(repositorySelector,onComplete){
	var self = this;

	var sum = function(repositories,next){
		var sum = Enumerable.FromArray(repositories)
						.Sum(repositorySelector);
		next(null,sum);
	};

	self.requests.push(sum);
	self.requests.push(onComplete);
	executeRequests(self.requests);

	return self;
};

var executeRequests = function(requests){
	async.waterfall(requests);
	return this;
};
