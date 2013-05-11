var url = require("url");
var https = require("https");
var GitHubCommits = require("./githubCommitsApi.js");

(function(exports){
	"use strict";

	var httpsRequest = function(rquestUrl,callback){
		var headers = {"User-Agent": "github-commits"};

		if(this.authorizationToken.length > 0)
			headers.Authorization = 'Bearer '+this.authorizationToken;

		var requestParams = url.parse(rquestUrl);
		requestParams.headers = headers;
		requestParams.method = "GET";
		
        var request = https.request(requestParams, function (response) {
			var responseData = '';
			response.setEncoding('utf8');

			response.on('data', function (chunk) {
				responseData = responseData + chunk;
			});

			response.on('end', function () {
				if (callback !==null) {
					callback(JSON.parse(responseData));
				}
			});

			response.on('error',function(error){
				console.log("error requestParams"+requestParams+" error:"+error);
				callback();
			});
            
		});
          
        request.end();
	};

	exports.Connect = function(apiAuthorizationToken,apiUrl){
		var connection =  GitHubCommits.Connect(apiAuthorizationToken,apiUrl);
		connection.makeRequest = httpsRequest;
		return connection;
	};

})(exports);