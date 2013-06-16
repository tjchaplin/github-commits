var Enumerable = require("yaenumerable");
var validator = require("./validator.js");
var parser = require("./parser.js");
var githubDailyCommitCount = require("./githubDailyCommitCount.js");
var githubRepositoryConverter = require("./githubRepositoryConverter.js");

// var request = {
// 	owners : ["tjchaplin"],
// 	sinceDate : "1900-01-01T00:00:00Z",
// 	untilDate : new Date(),
// 	currentWeek : false,
	
// }




(function(exports){
	"use strict";

	var GitHubCommitsApi = function(apiAuthorizationToken,apiUrl){

		if (typeof apiAuthorizationToken === 'undefined')
			apiAuthorizationToken = '';

		if (typeof apiUrl === 'undefined')
			apiUrl = 'https://api.github.com';

		this.baseApiUrl = apiUrl;
		this.authorizationToken = apiAuthorizationToken;
		self.repositories = [];
	};

	GitHubCommitsApi.prototype.getRepositoryDailyCommits = githubDailyCommitCount.request;

	GitHubCommitsApi.prototype.getAllRepositoryCommits = function(owner,options,onComplete){
		var self = this;

		var createRepositoryRequest = function(repository,options){
			repository.sinceDate = options.sinceDate;
			repository.untilDate = options.untilDate;

			return repository;
		};

		var onEachRepository = function(repository, onUpdated){
									var request = createRepositoryRequest(repository,options);
									self.updateRepositoryCommitCount(request,onUpdated);
								};

		self.getRepositories(owner,function(repositories){
			Enumerable.FromArray(repositories)
					.AsyncForEach(onEachRepository,onComplete);
		});
	};



	GitHubCommitsApi.prototype.getRepositories = function(owner,callback){
		var self = this;

		owner = parser.parseOwner(owner);
        var url = self.baseApiUrl+'/'+owner.type+'/'+owner.name+'/repos';

        self.makeRequest(url, function(githubRepositories){
			if(!githubRepositories)
				callback();

			var repositories = githubRepositoryConverter.convertAll(githubRepositories);
			callback(repositories);
        });
	};

	GitHubCommitsApi.prototype.updateRepositoryCommitCount = function (repository, options, callback){
		var self = this;

		self.getRepositoryDailyCommits(repository,options,function(dailyCommits){
			var sumOfDailyCommits = Enumerable.FromArray(dailyCommits)
								.Sum(function(dailyCommit){return dailyCommit.commitCount;});

			repository.numberOfCommits = sumOfDailyCommits;
			callback(repository);
		});
	};

	GitHubCommitsApi.prototype.makeRequest = function(rquestUrl,callback){
		callback();
	};

	GitHubCommitsApi.prototype.Request = function(query){
		makeRequest(query.url,query.callback);
	};

	GitHubCommitsApi.prototype.Sum = function(){
		var sum = Enumerable.FromArray(repositories)
								.Sum(function(repository){return repository.commitCount;});

		return sum;
	};

	exports.Connect = function(apiAuthorizationToken,apiUrl){
		return new GitHubCommitsApi(apiAuthorizationToken,apiUrl);
	};

})(exports);
