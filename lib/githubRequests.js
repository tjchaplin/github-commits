var Enumerable = require("yaenumerable");

"use strict";

var GitHubRequest = module.exports = exports = function(apiUrl,requestClient){
	var self = this;

	if (typeof apiUrl === 'undefined')
		apiUrl = 'https://api.github.com';

	self.owner = undefined;
	self.baseApiUrl = apiUrl;
	self.ownerType = undefined;
	self.requestClient = requestClient;

	return self;
};

GitHubRequest.prototype.forUser = function(owner){
	this.ownerType = "User";
	this.owner = owner;
};

GitHubRequest.prototype.forOrg = function(owner){
	this.ownerType = "Org";
	this.owner = owner;
};

GitHubRequest.prototype.repositoriesRequests = function(){
	var self = this;

	var request = function(onComplete){
    	var requestUrl = self.baseApiUrl+'/'+self.ownerType+'/'+self.owner+'/repos';
		
		self.requestClient.request(requestUrl,function(repositories){
			var results = [];
			if(repositories)
				results = repositories;

			onComplete(null,results);
		});
	};

	return request;		
};

GitHubRequest.prototype.RepositoryCommitsRequest = function(conditions){
	var self = this;

	var request = function(repository,onComplete){
		var requestUrl = self.baseApiUrl+'/repos/'+self.owner+'/'+repository.name+'/commits';

		if(conditions)
			requestUrl = applyCondition(conditions,requestUrl);

		self.requestClient.request(requestUrl,function(commits){
			repository.commitCount = 0;
			if(commits)
				repository.commitCount = commits.length;

			onComplete(repository);
		});
	};

	return request;		
};

var applyCondition = function(condition,url){

	var conditionUrl = "?";
	if(condition.sinceDate != null)
		conditionUrl += "since="+condition.sinceDate+"&";

	if(condition.untilDate != null)
		conditionUrl += "until="+condition.untilDate+"&";

	conditionUrl=conditionUrl.slice(0,conditionUrl.length-1);

	url += conditionUrl;

	return url;
};