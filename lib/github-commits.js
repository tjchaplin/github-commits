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
		
    	retriableRequest(requestParams,callback,1,5);
	};

	var retriableRequest = function(requestParams,callback,currentAttempt,maxAttempts)
	{
    	var request = https.request(requestParams, function (response) {
			var responseData = '';
			response.setEncoding('utf8');

			if(!isValidResponse(response.statusCode))
			{
				console.log("Invalid Response Code:"+response.statusCode+" when making request:"+requestParams);
				return;
			}

			if(shouldRetry(response.statusCode)
			{
				setTimeout(retriableRequest(requestParams,callback,currentAttempt++,maxAttempts),3000);
				return;
			}

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
	}

	var isValidResponse = function(responseCode){
		if(responseCode === 403)
			return false;

		return true;
	};

	var shouldRetry = function(responseCode){
		if(responseCode === 202)
			return true;

		if(responseCode === 204)
			return true;

		return false;
	};

	exports.Connect = function(apiAuthorizationToken,apiUrl){
		var connection =  GitHubCommits.Connect(apiAuthorizationToken,apiUrl);
		connection.makeRequest = httpsRequest;
		return connection;
	};

})(exports);