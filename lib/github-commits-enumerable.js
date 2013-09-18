var async = require("async");
var enumerable = require("yaenumerable");
var dateExtensions = require("./dateExtensions.js");
var GithubRequestBuilder = require("./github-request-builder.js");

(function(){
	"use strict";

	var GitHubEnumerable = module.exports = exports = function(requests){
		var self = this;
		self.requests = requests;
		return self;
	};

	GitHubEnumerable.prototype.toArray = function(onComplete,onError){
		var self = this;

		self.requests.push(onComplete);
		return executeRequests(self.requests,onError);
	};

	GitHubEnumerable.prototype.sumOpenIssues= function(onComplete,onError){
		var self = this;
		return self.sum(function(repository){ return repository.openIssues;},onComplete,onError);
	};

	GitHubEnumerable.prototype.sumCommits = function(onComplete,onError){
		var self = this;
		return self.sum(function(repository){ return repository.commitCount;},onComplete,onError);
	};

	GitHubEnumerable.prototype.sum = function(selector,onComplete,onError){
		var self = this;

		var sum = function(repositories,next){
			var sum = enumerable.fromArray(repositories)
							.sum(selector);
			next(null,sum);
		};

		self.requests.push(sum);
		self.requests.push(onComplete);
		return executeRequests(self.requests,onError);
	};

	var executeRequests = function(requests,onError){
		async.waterfall(requests,function(error,results){
			if(error && onError)
				onError(error);
		});

		return this;
	};
})();