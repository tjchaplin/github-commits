var enumerable = require("yaenumerable");

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

		var repositories = enumerable.fromArray(gitHubRepositories)
									.select(function(githubRepository){ 
										return exports.convert(githubRepository);
									})
									.toArray();
		return repositories;
	};

})(exports);