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

GitHubEnumerable.prototype.sum = function(repositorySelector,onComplete){
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
