require=(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({"github-commits":[function(require,module,exports){
module.exports=require('BC7pU3');
},{}],"BC7pU3":[function(require,module,exports){
var GitHubCommits = require("./GitHubCommitsApi.js");

(function(exports){
	"use strict";

	var getRequest = function(rquestUrl,callback){
		var headers = {"User-Agent": "github-commits"};

		if(this.authorizationToken.length > 0)
			headers.Authorization = 'Bearer '+this.authorizationToken;

		$.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(data) { callback(data); },
                error: function(error) { console.log("error:"+error);},
                headers: headers 
            });
	};

	exports.Connect = function(apiAuthorizationToken,apiUrl){
		var connection =  GitHubCommits.Connect(apiAuthorizationToken,apiUrl);
		connection.makeRequest = getRequest;
		return connection;
	};

})(exports);
},{"./GitHubCommitsApi.js":1}],1:[function(require,module,exports){
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
},{"yaenumerable":2}],2:[function(require,module,exports){
(function(exports){
	"use strict";
	
	var Enumerable = function(sequence){
		var self = this;
		if(sequence === 'undefined' || sequence === null)
			sequence = [];

		self.sequence = sequence;		
		return self;
	};

	Enumerable.prototype.Where = function(condition){
		var self = this;
		var results = [];

		if(!condition)
			return new Enumerable(results);

		for (var i = 0; i < self.sequence.length; i++) {
			if(condition(self.sequence[i]))
				results.push(self.sequence[i]);
		}

		return new Enumerable(results);
	};

	Enumerable.prototype.Sum = function(selector){
		var self = this;

		if(!selector)
			selector = function(item){return item;};

		var sum = 0;
		self.ForEach(function(item){ sum += selector(item); });
		return sum;
	};

	Enumerable.prototype.ForEach = function(onEach){
		var self = this;

		if(!onEach)
			return self;

		for (var i = 0; i < self.sequence.length; i++) {
			onEach(self.sequence[i]);
		}

		return self;
	};

	Enumerable.prototype.Select = function(selector){
		var self = this;
		var selected = [];

		if(!selector)
			return new Enumerable(selected);

		for (var i = 0; i < self.sequence.length; i++) {
			selected.push(selector(self.sequence[i]));
		}

		return new Enumerable(selected);
	};

	Enumerable.prototype.First = function(selector){
		var self = this;

		if(!selector)
			return self.sequence[0];

		return selector(self.sequence[0]);
	};

	Enumerable.prototype.Any = function(condition){
		var self = this;

		var result = false;

		if(!condition)
			return self.sequence.length > 0;

		for (var i = 0; i < self.sequence.length; i++) {
			if(condition(self.sequence[i]))
				result = true;
		}
		return result;
	};

	Enumerable.prototype.Count = function(condition){
		var self = this;

		if(!self.sequence)
			return 0;

		return self.sequence.length;
	};

	Enumerable.prototype.ToArray = function(){
		var self = this;
		return self.sequence;
	};

	exports.FromArray = function(array){
		return new Enumerable(array);
	};

})(exports);
},{}]},{},[])
;