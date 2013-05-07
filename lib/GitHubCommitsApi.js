var Enumerable = require("yaenumerable");

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

	GitHubCommitsApi.prototype.getOwnerRepositories = function(owner,callback){
		var self = this;

		owner = self.parseOwner(owner);
        var url = self.baseApiUrl+'/'+owner.type+'/'+owner.name+'/repos';

        self.makeRequest(url, function(data){
			if(!data)
				callback();

			var repositories = Enumerable.FromArray(data)
										.Select(function(item){ return self.toRepository(item);})
										.ToArray();

			callback(repositories);
        });
	};

	GitHubCommitsApi.prototype.getRepositoryCommits = function (repository, options ,callback){
		var self = this;
		
		var optionQueryString = self.optionsToQueryString(options);	
        var url = self.baseApiUrl+'/repos/'+repository.owner+'/'+repository.name+'/stats/participation';

		self.makeRequest(url,function(commitData){
			var numberOfCommits = 0;

			if(commitData.all)
				numberOfCommits = commitData.all[commitData.all.length-1];

			repository.numberOfCommits = numberOfCommits;
			callback(repository);
		});
	};

	GitHubCommitsApi.prototype.getRepositoryCommits2 = function (repository, options ,callback){
		var self = this;
		
		var optionQueryString = self.optionsToQueryString(options);	
        var url = self.baseApiUrl+'/repos/'+repository.owner+'/'+repository.name+'/commits'+optionQueryString;

		self.makeRequest(url,function(commitData){
			var numberOfCommits = 0;

			if(commitData)
				numberOfCommits = commitData.length;

			repository.numberOfCommits = numberOfCommits;
			callback(repository);
		});
	};

	GitHubCommitsApi.prototype.getAllRepositoryCommits = function(owner,options,callback){
		var self = this;

		self.getOwnerRepositories(owner,function(repositories){
			self.totalRepositoryCommits(repositories,options,callback);
		});
	};

	GitHubCommitsApi.prototype.totalRepositoryCommits = function(repositories, options, callback){
		var self = this;

		var updatedRepositories = [];
		var numberToUpdate = repositories.length;

		Enumerable.FromArray(repositories)
					.ForEach(function(repository){ 
						self.getRepositoryCommits(repository, options, function(updatedRepository){
							updatedRepositories.push(updatedRepository);
							numberToUpdate--;

							if(numberToUpdate === 0)
								callback(updatedRepositories);
						});
					});
	};

	GitHubCommitsApi.prototype.parseOwner = function(owner){
		if(typeof owner === "string")
			owner = {name: owner};

		if(!owner.type)
			owner.type = "users";
		
		if(!owner.name)
			return {};

		return owner;
	};

	GitHubCommitsApi.prototype.toRepository = function(gitData){

		var repository = {
			name : gitData.name,
			gitUrl : gitData.git_url,
			gitSshUrl : gitData.ssh_url,
			owner : gitData.owner.login,
			createdDate : gitData.created_at,
			lastUpdatedDate : gitData.updated_at,
			openIssues : gitData.open_issues_count
		};

		return repository;
	};

	GitHubCommitsApi.prototype.optionsToQueryString = function(options){
		var self = this;
		var optionUrlQuery = "";
		
		if(!options)
			return optionUrlQuery;
		
		optionUrlQuery = "?";

		if(options.sinceDate)
			optionUrlQuery += "since="+options.sinceDate+"&";

		if(options.untilDate)
			optionUrlQuery += "until="+options.untilDate+"&";

		return optionUrlQuery.substring(0,optionUrlQuery.length-1);
	};

	GitHubCommitsApi.prototype.makeRequest = function(rquestUrl,callback){
		callback();
	};

	exports.Connect = function(apiAuthorizationToken,apiUrl){
		return new GitHubCommitsApi(apiAuthorizationToken,apiUrl);
	};

})(exports);