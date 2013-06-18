var Enumerable = require("yaenumerable");
var validator = require("./validator.js");
var parser = require("./parser.js");
var AsyncRequest = require("./asyncRequest.js");
var async = require("async");
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



		var request = function(onComplete){
        	var requestUrl = self.baseApiUrl+'/'+self.ownerType+'/'+self.owner+'/repos';
			
			self.requestClient.request(requestUrl,function(repositories){
				if(!repositories)
					onComplete();

				var repositories = githubRepositoryConverter.convertAll(repositories);
				onComplete(null,repositories);
			});
		};

		self.requests.push(request);
		return self;		
	};

	GitHubRequest.prototype.commits = function(repositories){
		var self = this;

		var repositoryCommitRequest = function(repository,onComplete){
			var requestUrl = self.baseApiUrl+'/repos/'+self.owner+'/'+repository.name+'/commits';

			self.requestClient.request(requestUrl,function(commits){
				repository.commitCount = 0;
				if(commits)
					repository.commitCount = commits.length;

				onComplete(repository);
			});
		};

		var request = function(onComplete){
			Enumerable.FromArray(repositories)
						.AsyncForEach(repositoryCommitRequest, 
										function(updatedRepositories){
											onComplete(null, updatedRepositories);
										});
		};
		
		self.requests.push(request);

		return self;		
	};

	GitHubRequest.prototype.toArray = function(onComplete){
		var self = this;

		self.requests.push(onComplete);
		async.waterfall(self.requests);

		return self;
	};

	GitHubRequest.prototype.sum = function(repositorySelector,onComplete){
		var self = this;

		var sum = function(repositories,next){
			var sum = Enumerable.FromArray(repositories)
							.Sum(repositorySelector);
			next(null,sum);
		};

		self.requests.push(sum);
		self.requests.push(onComplete);
		async.waterfall(self.requests);

		return self;
	};

	exports.Connect = function(apiAuthorizationToken,apiUrl){
		return new GitHubRequest(apiAuthorizationToken,apiUrl);
	};

})(exports);
