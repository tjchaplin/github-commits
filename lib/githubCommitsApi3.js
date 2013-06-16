var Enumerable = require("yaenumerable");
var validator = require("./validator.js");
var parser = require("./parser.js");
//var githubDailyCommitCount = require("./githubDailyCommitCount.js");
var githubRepositoryConverter = require("./githubRepositoryConverter.js");

// gitConnection.user("tjchaplin")
//              .repositories()
//              .currentWeekCommits(function(){

//              },{fromDate:'1/1/2012',
//                 toDate:'1/1/2012'});
//              .commits({fromDate:, toDate:})

// gitConnection.user("tjchaplin")
//              .repositories()
//              .currentWeekCommits()
//              .where(function(commit){
//              	return commit > 1;
//              })
//              .toList(function(commits){

//              });

(function(exports){
	"use strict";

	var GitHubRequest = function(apiAuthorizationToken,apiUrl){
		var self = this;

		if (typeof apiAuthorizationToken === 'undefined')
			apiAuthorizationToken = '';

		if (typeof apiUrl === 'undefined')
			apiUrl = 'https://api.github.com';

		self.requests = [];
		self.owner = undefined;
		self.baseApiUrl = apiUrl;
		self.ownerType = undefined;
		self.requestClient = undefined
		self.authorizationToken = apiAuthorizationToken;

		return self;
	};
	GitHubRequest.prototype.user = function(userName){
		var self = this;

		self.owner = userName;
		self.ownerType = "User"

		return self;
	};
	GitHubRequest.prototype.org = function(orgName){
		var self = this;

		self.owner = orgName;
		self.ownerType = "Org"

		return self;
	};
	GitHubRequest.prototype.repositories = function(){
		var self = this;

        var requestUrl = self.baseApiUrl+'/'+self.ownerType+'/'+self.owner+'/repos';
        var requestCallback = function(githubRepositories,onComplete){

			if(!githubRepositories)
				onComplete();

			var repositories = githubRepositoryConverter.convertAll(githubRepositories);

			onComplete(repositories);
        };
		
		self.addRequest(requestUrl,requestCallback);

		return self;		
	};

	GitHubRequest.prototype.addRequest = function(requestUrl,requestCallback){
		var self = this;
		
		var request = {url:requestUrl,
					   callback:requestCallback};

		self.requests.push(request);
	};

	GitHubRequest.prototype.toArray = function(onComplete){
		var self = this;
		var results = [];

		self.executeRequest(0,results,onComplete);
		return self;
	};


	GitHubRequest.prototype.sum = function(repositorySelector,onComplete){
		var self = this;

		//Execute chained requests

		//Then

		var sum = Enumerable.FromArray(repositories)
							.Sum(repositorySelector);

		return sum;
	};

	GitHubRequest.prototype.executeRequest = function(currentRequestIndex,results,onAllRequestsComplete){
		var self = this;
		if(!currentRequestIndex)
			currentRequestIndex = 0;

		if(currentRequestIndex >= self.requests.length){
			onAllRequestsComplete(results);
			return;
		}


		var currentRequest = self.requests[currentRequestIndex];
		self.requestClient.request(currentRequest.url,function(result){
			currentRequest.callback(result,function(updatedResult){
				results = updatedResult;
				self.executeRequest(++currentRequestIndex,results,onAllRequestsComplete);
			});
		});
	};

	exports.Connect = function(apiAuthorizationToken,apiUrl){
		return new GitHubRequest(apiAuthorizationToken,apiUrl);
	};

})(exports);
