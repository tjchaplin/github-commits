var url = require("url");
var https = require("https");
var Cache = require("./cache.js");
var GitHubCommits = require("./github-commits-api.js");

(function(){
	"use strict";
	var httpsRequest = function(apiAuthorizationToken){
		this.authorizationToken = apiAuthorizationToken;
		this.cache = new Cache();
	};

	httpsRequest.prototype.request = function(requestUrl,callback){
		var self = this;

		var lastResponseData = undefined;
		var lastRequest = self.cache.getValue(requestUrl);
		var headers = {"User-Agent": "github-commits"};

		if(self.authorizationToken.length > 0)
			headers.Authorization = 'Bearer '+self.authorizationToken;

		if(lastRequest){
			headers["If-Modified-Since"] = lastRequest.lastRequestDate.toUTCString();
			lastResponseData = lastRequest.lastResponseData;
		}

		requestUrl=urlAppendMaxResultsPerPage(requestUrl);

		var requestParams = url.parse(requestUrl);
		requestParams.headers = headers;
		requestParams.method = "GET";
		
		self.retriableRequest(requestParams,lastResponseData,callback,1,5);
	};

	httpsRequest.prototype.retriableRequest = function(requestParams,lastResponseData,callback,currentAttempt,maxAttempts)
	{
		var self = this;

		var request = https.request(requestParams, function (response) {
			var responseData = '';
			response.setEncoding('utf8');

			if(!isValidResponse(response.statusCode)){
				console.log("Invalid Response Code:"+response.statusCode+" when making request:"+requestParams.href+" response headers:"+JSON.stringify(response.headers));
				return;
			}

			if(shouldRetry(response.statusCode)){
				setTimeout(self.retriableRequest(requestParams,callback,currentAttempt++,maxAttempts),3000);
				return;
			}

			if(!hasBeenModified(response.statusCode)){
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

				self.cache.forKey(requestParams.href)
							.setValue({
								lastRequestDate : new Date(),
								lastResponseData : JSON.parse(responseData)
							});
			});

			response.on('error',function(error){
				console.log("error requestParams"+requestParams+" error:"+error);
				callback();
			});
            
		});
          
        request.end();
	};

	var urlAppendMaxResultsPerPage = function(url){
		var requestParamater = "per_page=100";

		if(url.indexOf("?") >= 0)
			url += "&"+requestParamater;
		else
			url += "?"+requestParamater;

		return url;
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

	module.exports = exports  =function(apiAuthorizationToken,apiUrl){
		if (typeof apiAuthorizationToken === 'undefined')
			apiAuthorizationToken = '';

		return new GitHubCommits(new httpsRequest(apiAuthorizationToken),apiUrl);;
	};

})();