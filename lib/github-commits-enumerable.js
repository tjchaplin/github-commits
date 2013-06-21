var async = require("async");
var Enumerable = require("yaenumerable");
var dateExtensions = require("./dateExtensions.js");
var GithubRequestBuilder = require("./github-request-builder.js");

"use strict";

GitHubEnumerable = module.exports = exports = function(requests){
	var self = this;
	self.requests = requests;
	return self;
};

GitHubEnumerable.prototype.toArray = function(onComplete){
	var self = this;


	self.requests.push(onComplete);
	executeRequests(self.requests);

	return self;
};

GitHubEnumerable.prototype.sumOpenIssues= function(onComplete){
	var self = this;
	self.sum(function(repository){ return repository.openIssues},onComplete);

	return self;
};

GitHubEnumerable.prototype.sumCommits = function(onComplete){
	var self = this;
	self.sum(function(repository){ return repository.commitCount},onComplete);

	return self;
};

GitHubEnumerable.prototype.sum = function(selector,onComplete){
	var self = this;

	var sum = function(repositories,next){
		var sum = Enumerable.FromArray(repositories)
						.Sum(selector);
		next(null,sum);
	};

	self.requests.push(sum);
	self.requests.push(onComplete);
	executeRequests(self.requests);

	return self;
};

var executeRequests = function(requests,onComplete){
	async.waterfall(requests);

	return this;
};
