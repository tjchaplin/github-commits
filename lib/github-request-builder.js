var repositoryConverter = require('./github-repository-converter.js');

(function(){
	"use strict";

	var GitHubRequestBuilder = module.exports = exports = function(apiUrl,requestClient){
		var self = this;

		if (typeof apiUrl === 'undefined')
			apiUrl = 'https://api.github.com';

		self.owner = undefined;
		self.baseApiUrl = apiUrl;
		self.ownerType = undefined;
		self.requestClient = requestClient;

		return self;
	};

	GitHubRequestBuilder.prototype.forUser = function(owner){
		this.ownerType = "users";
		this.owner = owner;
	};

	GitHubRequestBuilder.prototype.forOrg = function(owner){
		this.ownerType = "orgs";
		this.owner = owner;
	};

	GitHubRequestBuilder.prototype.forRepositories = function(){
		var self = this;

		var request = function(onComplete){
			if(!onComplete)
				return;

			var requestUrl = self.baseApiUrl+'/'+self.ownerType+'/'+self.owner+'/repos';
			self.requestClient.request(requestUrl,function(repositories){
				var results = [];
				if(repositories)
					results = repositories;
				
				results = repositoryConverter.convertAll(results);
				onComplete(null,results);
			},function(error){
				onComplete(error);
			});
		};

		return request;		
	};

	//TODO: The onComplete for this method is different than async
	GitHubRequestBuilder.prototype.forRepositoryCommits = function(conditions){
		var self = this;

		var request = function(repository,onComplete,onError){
			if(!(repository.name)){
				var errorMessage = "Repository Name must be defined";
				onComplete({},errorMessage);
			}

			var requestUrl = self.baseApiUrl+'/repos/'+self.owner+'/'+repository.name+'/commits';

			if(conditions)
				requestUrl = applyCondition(conditions,requestUrl);

			self.requestClient.request(requestUrl,
				function(commits){
					repository.commitCount = 0;
					if(commits)
						repository.commitCount = commits.length;

					onComplete(repository);
				},function(error){
					if(onError)
						onError(error);
				});
		};

		return request;		
	};

	var applyCondition = function(condition,url){

		var conditionUrl = "?";
		if(condition.sinceDate !== undefined)
			conditionUrl += "since="+condition.sinceDate+"&";

		if(condition.untilDate !== undefined)
			conditionUrl += "until="+condition.untilDate+"&";

		conditionUrl=conditionUrl.slice(0,conditionUrl.length-1);

		url += conditionUrl;

		return url;
	};
})();