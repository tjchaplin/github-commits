var Enumerable = require("yaenumerable");

(function(exports){
	"use strict";

	exports.convert = function(gitHubRepository){

		var repository = {
			name : gitHubRepository.name,
			gitUrl : gitHubRepository.git_url,
			gitSshUrl : gitHubRepository.ssh_url,
			owner : gitHubRepository.owner.login,
			createdDate : gitHubRepository.created_at,
			lastUpdatedDate : gitHubRepository.updated_at,
			openIssues : gitHubRepository.open_issues_count
		};

		return repository;
	};

	exports.convertAll = function(gitHubRepositories){
		var self = this;

		if(!gitHubRepositories)
			return;

		var repositories = Enumerable.FromArray(gitHubRepositories)
									.Select(function(githubRepository){ 
										return exports.convert(githubRepository);
									})
									.ToArray();
		return repositories;
	};

})(exports);