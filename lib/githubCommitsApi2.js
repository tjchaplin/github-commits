var Enumerable = require("yaenumerable");
var validator = require("./validator.js");
var parser = require("./parser.js");
var githubDailyCommitCount = require("./githubDailyCommitCount.js");
var githubRepositoryConverter = require("./githubRepositoryConverter.js");

(function(exports){
	"use strict";

	var GitHubRequest = function(apiAuthorizationToken,apiUrl,ownerType, owner,requestClient){
		var self = this;

		if (typeof apiAuthorizationToken === 'undefined')
			apiAuthorizationToken = '';

		if (typeof apiUrl === 'undefined')
			apiUrl = 'https://api.github.com';

		self.owner;
		self.requests = [];
		self.repositories = [];
		self.baseApiUrl = apiUrl;
		self.ownerType = ownerType;
		self.requestClient = requestClient
		self.authorizationToken = apiAuthorizationToken;
	};

	GitHubRequest.prototype.repositories = function(){
		var self = this;

        var requestUrl = self.baseApiUrl+'/'+self.ownerType+'/'+self.owner+'/repos';

        var requestCallback = function(githubRepositories,callback){
			if(!githubRepositories)
				callback();

			var repositories = githubRepositoryConverter.convertAll(githubRepositories);
			self.repositories =repositories;

			callback(repositories);
        });
		
		self.addRequest(url,requestCallback);

		return self;
	};

	GitHubRequest.prototype.addRequest(url,applyRequestCondition,requestCallback){
		var self = this;

		var applyCondition = function(condition){
			applyRequestCondition(condition,url);
		};
		
		var request = {url:requestUrl,
					   condtion:applyCondition,
					   callback,requestCallback};

		self.requests.add(request);
	};

	GitHubRequest.prototype.commits = function(){
		var self = this;

        var requestCallback = function(repositoryCommits,callback){
			// if(!githubRepositories)
			// 	callback();

			// var repositories = githubRepositoryConverter.convertAll(githubRepositories);
			// self.repositories =repositories;

			// callback(repositories);
        });

		var applyCondition = function(condition,url){
			var conditionUrl = "?";
			if(condition.fromDate != null)
				conditionUrl += "since="+condition.fromDate+"&";

			if(condition.toDate != null)
				conditionUrl += "untilDate="+condition.toDate+"&";

			conditionUrl=conditionUrl.slice(0,conditionUrl.length-1);

			url += conditionUrl;
		};

		Enumerable.FromArray(repositories)
			.ForEach(function(repository){
				var url = self.baseApiUrl+'/repos/'+self.owner+'/'+repository.name+'/commits';

				self.addRequest(url,applyCondition,requestCallback);
			});

		return self;
	};

	GitHubRequest.prototype.forCurrent = function(currentType){
		var self = this;
		
		if(currentType.toLowerCase() === "week")
			self.addRequestCondition({fromDate:new Date(),toDate:new Date()});


		return self;
	};	

	GitHubRequest.prototype.addRequestCondition(condition){
		for (var i = requests.length - 1; i >= 0; i--) {
			requests[i].applyCondition(condition);
		};
	}

	GitHubRequest.prototype.toArray = function(onComplete){
		var self = this;

		//Execute chained requests

		//Then
		var results = [];


		return results;
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

		if(currentRequestIndex >= requests.length)
			 onAllRequestsComplete(results);

		var currentRequest = requests[currentRequestIndex];
		
		self.client.request(currentRequest.url,function(result){
			currentRequest.callback(result,function(updatedResult){
				results.push(updatedResult);
				self.executeRequest(currentRequestIndex++,results,callback);
			});
		});
	};

	exports.Connect = function(apiAuthorizationToken,apiUrl){
		return new GitHubRequest(apiAuthorizationToken,apiUrl);
	};

})(exports);
