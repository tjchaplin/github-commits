var GitHubCommits = require("./githubCommitsApi.js");

(function(exports){
	"use strict";

	var getRequest = function(rquestUrl,callback){
		if(this.authorizationToken.length > 0)
			headers.Authorization = 'Bearer '+this.authorizationToken;

		$.ajax({
                url: rquestUrl,
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