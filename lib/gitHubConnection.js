
// var request = {
// 	owners : ["tjchaplin"],
// 	sinceDate : "1900-01-01T00:00:00Z",
// 	untilDate : new Date(),
// 	currentWeek : false,
	
// }

(function(exports){
	"use strict";

	var GitHubCommitsApi = function(apiAuthorizationToken,apiUrl, httpsRequest){

		if (typeof apiAuthorizationToken === 'undefined')
			apiAuthorizationToken = '';

		if (typeof apiUrl === 'undefined')
			apiUrl = 'https://api.github.com';

		this.baseApiUrl = apiUrl;
		this.authorizationToken = apiAuthorizationToken;
		
		this.makeRequest = httpsRequest;
	};

	GitHubCommitsApi.prototype.makeRequest = function(rquestUrl,callback){
		callback();
	};

	exports.Connect = function(apiAuthorizationToken,apiUrl){
		return new GitHubCommitsApi(apiAuthorizationToken,apiUrl);
	};

})(exports);
