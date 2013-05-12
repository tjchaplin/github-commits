var Enumerable = require("yaenumerable");
var validator = require("./validator.js");
var parser = require("./parser.js");
var githubDailyCommitCount = require("./githubDailyCommitCount.js");
var githubRepositoryConverter = require("./githubRepositoryConverter.js");

(function(exports){
	"use strict";

	var GitHubCommitsApi = function(apiAuthorizationToken,apiUrl){

		if (typeof apiAuthorizationToken === 'undefined')
			apiAuthorizationToken = '';

		if (typeof apiUrl === 'undefined')
			apiUrl = 'https://api.github.com';

		this.baseApiUrl = apiUrl;
		this.authorizationToken = apiAuthorizationToken;
	};

	GitHubCommitsApi.prototype.getAllRepositoryCommits = function(owner,options,onComplete){
		var self = this;

		var onEachRepository = function(repository, onUpdated){
									self.updateRepositoryCommitCount(repository,options,onUpdated);
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

	GitHubCommitsApi.prototype.getRepositoryDailyCommits = function (repository, options, callback){
		var self = this;

        var url = self.baseApiUrl+'/repos/'+repository.owner+'/'+repository.name+'/stats/commit_activity';

		self.makeRequest(url,function(commitStats){
			var dailyCommits = githubDailyCommitCount.dailyCommits(commitStats,options);
			callback(dailyCommits);
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

	exports.Connect = function(apiAuthorizationToken,apiUrl){
		return new GitHubCommitsApi(apiAuthorizationToken,apiUrl);
	};

})(exports);
