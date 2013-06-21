var url = require("url");
var https = require("https");
var GitHubCommits = require("./github-commits-api.js");

(function(){
	"use strict";
	var httpsRequest = function(apiAuthorizationToken){
		this.authorizationToken = apiAuthorizationToken;
		this.lastRequest = {}
	};

	httpsRequest.prototype.request = function(rquestUrl,callback){
		var self = this;

		var headers = {"User-Agent": "github-commits"};

		if(self.authorizationToken.length > 0)
			headers.Authorization = 'Bearer '+self.authorizationToken;

		if(self.lastRequest[rquestUrl])
			headers["If-Modified-Since"] = self.lastRequest[rquestUrl].lastRequestDate.toUTCString();

		var requestParams = url.parse(rquestUrl);
		requestParams.headers = headers;
		requestParams.method = "GET";
		
		self.retriableRequest(requestParams,callback,1,5);
	};

	httpsRequest.prototype.retriableRequest = function(requestParams,callback,currentAttempt,maxAttempts)
	{
		var self = this;

		var request = https.request(requestParams, function (response) {
		var responseData = '';
		response.setEncoding('utf8');

		if(!isValidResponse(response.statusCode)){
			console.log("Invalid Response Code:"+response.statusCode+" when making request:"+requestParams);
			return;
		}

		if(shouldRetry(response.statusCode)){
			setTimeout(self.retriableRequest(requestParams,callback,currentAttempt++,maxAttempts),3000);
			return;
		}

		if(!hasBeenModified(response.statusCode)){
			var lastResponseData = undefined;
			if(self.lastRequest[requestParams.href])
				lastResponseData = self.lastRequest[requestParams.href].lastResponseData;

			if(callback)
				callback(lastResponseData);

			return;
		}

		response.on('data', function (chunk) {
			responseData = responseData + chunk;
		});

		response.on('end', function () {
			if (callback) 
				callback(JSON.parse(responseData));

			self.lastRequest[requestParams.href] = {};
			self.lastRequest[requestParams.href].lastRequestDate = new Date();
			self.lastRequest[requestParams.href].lastResponseData = JSON.parse(responseData);
		});

		response.on('error',function(error){
			console.log("error requestParams"+requestParams+" error:"+error);
			callback();
		});
            
		});
          
        request.end();
	};

	var hasBeenModified = function(responseCode){
		if(responseCode === 304)
			return false;

		return true;
	};

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

	module.exports = exports  =function(apiUrl,apiAuthorizationToken){
		if (typeof apiAuthorizationToken === 'undefined')
			apiAuthorizationToken = '';

		return new GitHubCommits(new httpsRequest(apiAuthorizationToken),apiUrl);;
	};

})();